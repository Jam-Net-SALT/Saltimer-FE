import { v4 as uuid } from "uuid";
import {
  Avatar,
  AvatarsGroup,
  Card,
  Center,
  Grid,
  Notification,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import React, { useContext } from "react";
import AddNewMemberForm from "../../components/AddNewMember";
import { MobMemberRemote } from "../../components/MobMember";
import MobTimerRemote from "../../components/MobTimerRemote";
import {
  SaltimerContext,
  SaltimerContextInterface,
} from "../../services/SaltimerProvider";
import { Bulb } from "tabler-icons-react";

const SessionPage = () => {
  const hub = useContext<SaltimerContextInterface | null>(SaltimerContext);

  if (!hub) {
    console.log("Hub: ", hub);
    return <h1> Session Not found</h1>;
  }

  const getCurrentDriver = hub.onlineMember?.find(
    (m) => m.username === hub.sessionTimer?.currentDriver
  );

  const geNoneDriverMembersList = hub.onlineMember?.filter(
    (m) => m.username !== hub.sessionTimer?.currentDriver
  );

  const getOffLineMembers = hub.sessionInfo?.users.filter(
    (m) =>
      hub.onlineMember?.filter((om) => om.username === m.username).length === 0
  );

  if (hub?.serverInfo)
    setTimeout(() => {
      hub.clearServerInfo();
    }, 5000);

  return (
    <Grid justify='center' pt='lg'>
      <Center component={Grid.Col} pb='xl'>
        <Title>{hub.sessionInfo?.displayName}</Title>
      </Center>
      <Center component={Grid.Col} pb='xl'>
        <MobMemberRemote key={uuid()} user={getCurrentDriver} />
      </Center>
      <Center component={Grid.Col} pb='xl'>
        <MobTimerRemote />
      </Center>

      <Center component={Grid.Col}>
        <Title order={2} pr='lg'>
          Members
        </Title>
      </Center>
      {geNoneDriverMembersList?.map((user) => (
        <MobMemberRemote key={uuid()} user={user} />
      ))}
      <Center component={Grid.Col} pb='xl'>
        <Title order={5} pr='lg'>
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
    </Grid>
  );
};

export default SessionPage;
