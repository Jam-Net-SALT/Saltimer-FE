import {
  Badge,
  Button,
  Card,
  Center,
  Modal,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AddNewMob from "../../components/AddNewMob";
import { SaltimerApi } from "../../services/SaltimerApi";
import {
  SaltimerContext,
  SaltimerContextInterface,
} from "../../services/SaltimerProvider";
import { selectUser } from "../../store/CurrentUser";
import { MobSession } from "../../types/MobSession";
import useStyles from "./style";
import { MobTimerConnection } from "./types";

function JoinSessionPage() {
  const { classes } = useStyles();
  const navigator = useNavigate();
  const user = useSelector(selectUser);
  const [modalOpened, setModalOpened] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [jwtToken] = useState(window.localStorage.getItem("auth"));
  const [invitationToken, setInvitationToken] = useState("");
  const [mobSessions, setMobSessions] = useState<MobSession[]>([]);
  const hub = useContext<SaltimerContextInterface | null>(SaltimerContext);

  useEffect(() => {
    const setup = async () => {
      await fetchUserSessions();
      console.log("Connecting...");
      await hub?.setUpConnection();
    };
    setup();
  }, []);

  const fetchUserSessions = async () => {
    if (jwtToken) {
      const response = await new SaltimerApi(jwtToken).getMobTimerSessions();
      setMobSessions(response.data);
    }
  };

  const joinMobSessionsFromToken = async () => {
    try {
      if (jwtToken) {
        const response = await new SaltimerApi(jwtToken).joinMobTimerSession(
          invitationToken
        );
        await hub?.joinSession({
          Uuid: response.data.session.uniqueId,
          UserId: user?.id,
        });
        navigator(`/session/${response.data.session.id}`);
      }
    } catch (e: AxiosError | any) {
      if (e.response.data.title)
        return setSearchError("Not a valid session token");

      setSearchError(e.response.data.message);
    }
  };

  const joinMobSession = async (
    id: number,
    requestData: MobTimerConnection
  ) => {
    await hub?.joinSession(requestData);
    navigator(`/session/${id}`);
  };

  return (
    <div className={classes.wrapper}>
      <Center className={classes.inputContainer} pt={50}>
        <TextInput
          placeholder='Invitation token'
          mr='lg'
          value={invitationToken}
          variant='filled'
          className={classes.inputText}
          onChange={(e) => setInvitationToken(e.target.value)}
        />
        <Button onClick={joinMobSessionsFromToken}> Join session </Button>
      </Center>
      <Center pt='md'>
        <div>
          <Text className={classes.errorMsg}> {searchError} </Text>
        </div>
      </Center>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title='Create new mobtimer'
      >
        <AddNewMob onClose={() => setModalOpened(false)} />
      </Modal>
      <Center>
        <Button
          radius='lg'
          color='green'
          m='lg'
          onClick={() => setModalOpened(true)}
        >
          Create new mob timer
        </Button>
        <Button
          radius='lg'
          color='orange'
          m='lg'
          onClick={() => navigator("/local/session")}
        >
          Start local session
        </Button>
      </Center>

      <Center className={classes.listContainer}>
        {mobSessions.length === 0 ? (
          <Title order={3}>No mob session found</Title>
        ) : (
          mobSessions.map((m) => (
            <Card
              key={uuid()}
              shadow='lg'
              radius='lg'
              m='lg'
              className={classes.sessionCard}
            >
              <Card.Section p='lg'>
                <Center>
                  <Title order={3} align='center' pr='lg'>
                    {m.displayName}
                  </Title>
                  <Badge color='orange' variant='light'>
                    4 members
                  </Badge>
                </Center>
              </Card.Section>

              <Button
                variant='light'
                color='blue'
                fullWidth
                style={{ marginTop: 14 }}
                onClick={() =>
                  joinMobSession(m.id, {
                    UserId: user?.id,
                    Uuid: m.uniqueId,
                  })
                }
              >
                Join session
              </Button>
            </Card>
          ))
        )}
      </Center>
    </div>
  );
}

export default JoinSessionPage;
