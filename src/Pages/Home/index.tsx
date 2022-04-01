import { v4 as uuid } from "uuid";
import { Center, Grid, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import LocalSessionController from "../../components/LocalSessionController";
import MobMember from "../../components/MobMember";
import { selectLocalMobSession } from "../../store/LocalMobSession";
import MobTimer from "../../components/MobTimer";
import AddNewMemberForm from "../../components/AddNewMember";

function HomePage() {
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
        <MobMember key={uuid()} user={getCurrentDriver} />
      </Center>
      <Center component={Grid.Col} pb='xl'>
        <MobTimer />
      </Center>
      <Center component={Grid.Col} pb='xl'>
        <AddNewMemberForm />
      </Center>
      {geNoneDriverMembersList.map((user) => (
        <MobMember key={uuid()} user={user} />
      ))}
    </Grid>
  );
}

export default HomePage;
