import { v4 as uuid } from "uuid";
import { Center, Grid, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import LocalSessionController from "../../components/LocalSessionController";
import MobMember from "../../components/MobMember";
import { selectLocalMobSession } from "../../store/LocalMobSession";

function HomePage() {
  const localMobSession = useSelector(selectLocalMobSession);

  return (
    <Grid>
      <Center component={Grid.Col} pb='xl'>
        <LocalSessionController />
      </Center>
      {localMobSession.members.map((user) => (
        <MobMember key={uuid()} user={user} />
      ))}
    </Grid>
  );
}

export default HomePage;
