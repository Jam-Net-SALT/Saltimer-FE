import { Button, Card, Center, Loader, Title } from "@mantine/core";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SaltimerContext,
  SaltimerContextInterface,
} from "../../services/SaltimerProvider";
import { selectUser } from "../../store/CurrentUser";
import useStyles from "./style";
import { SessionCardProps } from "./type";

const SessionCard = ({ session, onRemove }: SessionCardProps) => {
  const { classes } = useStyles();
  const navigator = useNavigate();
  const user = useSelector(selectUser);
  const hub = useContext<SaltimerContextInterface | null>(SaltimerContext);

  if (!user) return <Loader />;

  const joinMobSessionHandler = async () => {
    await hub?.joinSession({ Uuid: session.uniqueId, UserId: user.id });
    navigator(`/session/${session.id}`);
  };

  return (
    <Card shadow='lg' radius='lg' m='lg' className={classes.sessionCard}>
      <Card.Section p='lg'>
        <Center>
          <Title order={3} align='center' pr='lg'>
            {session.displayName}
          </Title>
        </Center>
      </Card.Section>

      <Button
        variant='light'
        color='blue'
        fullWidth
        style={{ marginTop: 14 }}
        onClick={joinMobSessionHandler}
      >
        Join session
      </Button>
      <Button
        variant='light'
        color='red'
        fullWidth
        style={{ marginTop: 14 }}
        onClick={() => onRemove(session.id, user.id)}
      >
        Remove
      </Button>
    </Card>
  );
};

export default SessionCard;
