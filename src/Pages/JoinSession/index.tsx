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
import { v4 as uuid } from "uuid";
import { SaltimerApi } from "../../services/SaltimerApi";
import {
  SaltimerContext,
  SaltimerContextInterface,
} from "../../services/SaltimerProvider";
import { MobSession } from "../../types/MobSession";
import useStyles from "./style";

function JoinSessionPage() {
  const { classes } = useStyles();
  const [searchError, setSearchError] = useState("");
  const [jwtToken] = useState(window.localStorage.getItem("auth"));
  const [invitationToken, setInvitationToken] = useState("");
  const [mobSessions, setMobSessions] = useState<MobSession[]>([]);
  const hub = useContext<SaltimerContextInterface | null>(SaltimerContext);

  useEffect(() => {
    console.log("Check");
    fetchUserSessions();
  }, []);

  const fetchUserSessions = async () => {
    if (jwtToken) {
      const response = await new SaltimerApi(jwtToken).getMobTimerSessions();
      setMobSessions(response.data);
    }
  };

  const joinMobSessions = async () => {
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

  return (
    <div className={classes.wrapper}>
      <Center className={classes.inputContainer} pt={50}>
        <TextInput
          placeholder='Invitation token'
          mr='lg'
          value={invitationToken}
          onChange={(e) => setInvitationToken(e.target.value)}
        />
        <Button onClick={joinMobSessions}> Join session </Button>
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
