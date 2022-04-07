import { v4 as uuid } from "uuid";
import {
  Avatar,
  AvatarsGroup,
  Button,
  Center,
  Grid,
  Notification,
  Text,
  Title,
} from "@mantine/core";
import { useContext, useEffect } from "react";
import { MobMemberRemote } from "../../components/MobMember";
import MobTimerRemote from "../../components/MobTimerRemote";
import {
  SaltimerContext,
  SaltimerContextInterface,
} from "../../services/SaltimerProvider";
import { Bulb } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import useStyles from "./style";

const SessionPage = () => {
  const { classes } = useStyles();
  const navigator = useNavigate();
  const hub = useContext<SaltimerContextInterface | null>(SaltimerContext);

  useEffect(() => {
    return () => hub?.disconnectHub();
  }, []);

  if (!hub) {
    return <h1> Session Not found</h1>;
  }

  const getCurrentDriver = (): User | undefined => {
    if (hub?.sessionTimer && hub?.onlineMember) {
      return hub?.onlineMember[
        hub.sessionTimer?.totalRoundCount % hub?.onlineMember?.length
      ];
    }
  };

  const geNoneDriverMembersList = hub.onlineMember?.filter(
    (m) => m.username !== getCurrentDriver()?.username
  );

  const getOffLineMembers = hub.sessionInfo?.users.filter(
    (m) =>
      hub.onlineMember?.filter((om) => om.username === m.username).length === 0
  );

  if (hub?.serverInfo)
    setTimeout(() => {
      hub.clearServerInfo();
    }, 5000);

  const leaveSession = () => {
    hub.disconnectHub();
    navigator("/");
  };

  return (
    <Grid justify='center' pt='lg'>
      <Center component={Grid.Col} pb='xl'>
        <Title className={classes.title}>{hub.sessionInfo?.displayName}</Title>
      </Center>
      <Center component={Grid.Col} pb='xl'>
        <Text color='orange' pr='lg'>
          Invitation token:
        </Text>
        <span>{hub.sessionInfo?.uniqueId}</span>
      </Center>
      <Center component={Grid.Col} pb='xl'>
        <MobMemberRemote key={uuid()} user={getCurrentDriver()} />
      </Center>
      <Center component={Grid.Col} pb='xl'>
        <MobTimerRemote />
      </Center>

      <Center component={Grid.Col}>
        <Title order={2} pr='lg' className={classes.text}>
          Members
        </Title>
      </Center>
      {geNoneDriverMembersList?.map((user) => (
        <MobMemberRemote key={uuid()} user={user} />
      ))}
      <Center component={Grid.Col} pb='xl'>
        <Title order={5} pr='lg' className={classes.text}>
          offline members
        </Title>

        <AvatarsGroup limit={3}>
          {getOffLineMembers?.map((m) => (
            <Avatar src={m.profileImage} component='a' key={uuid()}>
              {m.fullName.match(/\b(\w)/g)}
            </Avatar>
          ))}
        </AvatarsGroup>
      </Center>
      <Center component={Grid.Col} mt={30}>
        <Button color='red' variant='filled' onClick={leaveSession}>
          Leave session
        </Button>
      </Center>
      <Grid.Col>
        {hub?.serverInfo ? (
          <Notification
            icon={<Bulb size={18} />}
            color='teal'
            title={hub?.serverInfo.title}
            onClose={hub.clearServerInfo}
          >
            {hub.serverInfo.message}
          </Notification>
        ) : null}
      </Grid.Col>
    </Grid>
  );
};

export default SessionPage;
