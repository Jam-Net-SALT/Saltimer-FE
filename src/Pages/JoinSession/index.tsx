import { Button, Grid, Title } from "@mantine/core";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import {
  SaltimerContext,
  SaltimerContextInterface,
} from "../../services/SaltimerProvider";

function JoinSessionPage() {
  const connectionData = {
    UserId: "testId",
    Uuid: "6526fff8-683e-4f14-a99a-caff41d268ce",
  };
  const hub = useContext<SaltimerContextInterface | null>(SaltimerContext);

  const onJoinRoom = () => hub?.joinRoom(connectionData);

  return (
    <div>
      <Button onClick={onJoinRoom}> Join room </Button>
      <Grid>
        {hub?.message.map((m) => (
          <Grid.Col key={uuid()}>
            <Title order={2}>{m}</Title>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}

export default JoinSessionPage;
