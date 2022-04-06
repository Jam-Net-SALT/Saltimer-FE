import {
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
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
  const [searchError, setSearchError] = useState("");
  const [jwtToken] = useState(window.localStorage.getItem("auth"));
  const [invitationToken, setInvitationToken] = useState("");
  const [mobSessions, setMobSessions] = useState<MobSession[]>([]);
  const hub = useContext<SaltimerContextInterface | null>(SaltimerContext);

  useEffect(() => {
    const setup = async () => {
      console.log("fetchUserSessions");
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
        console.log("Error: ", response.data);
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
          onChange={(e) => setInvitationToken(e.target.value)}
        />
        <Button onClick={joinMobSessionsFromToken}> Join session </Button>
      </Center>
      <Center pt='md'>
        <Text className={classes.errorMsg}> {searchError} </Text>
      </Center>
      <Grid className={classes.listContainer}>
        {mobSessions.length === 0 ? (
          <Grid.Col className={classes.emptyListText}>
            <Title order={3}>No mob session found</Title>
          </Grid.Col>
        ) : (
          mobSessions.map((m) => (
            <Grid.Col key={uuid()}>
              <Card shadow='lg' radius='lg' className={classes.sessionCard}>
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
            </Grid.Col>
          ))
        )}
      </Grid>
    </div>
  );
}

export default JoinSessionPage;
