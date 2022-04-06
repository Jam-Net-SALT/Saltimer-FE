import { v4 as uuid } from "uuid";
import { Center, Grid, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import { MobMemberLocal } from "../../components/MobMember";
import { selectLocalMobSession } from "../../store/LocalMobSession";
import MobTimerLocal from "../../components/MobTimerLocal";
import AddNewMemberForm from "../../components/AddNewMember";

const HomePage = () => {
  const localMobSession = useSelector(selectLocalMobSession);

  const getCurrentDriver = localMobSession.members.find(
    (m) => m.turn === localMobSession.currentTurn
  );

  const geNoneDriverMembersList = localMobSession.members.filter(
    (m) => m.turn !== localMobSession.currentTurn
  );
  return (
    <Grid justify='center'>
      <Center component={Grid.Col} pb='xl'>
        <Title>Driver</Title>
      </Center>
      <Center component={Grid.Col} pb='xl'>
        <MobMemberLocal user={getCurrentDriver} />
      </Center>
      <Center component={Grid.Col} pb='xl'>
        <MobTimerLocal />
      </Center>
      <Center component={Grid.Col} pb='xl'>
        <AddNewMemberForm />
      </Center>
      {geNoneDriverMembersList.map((user) => (
        <MobMemberLocal key={uuid()} user={user} />
      ))}
    </Grid>
  );
};

export default HomePage;
