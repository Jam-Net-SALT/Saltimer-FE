import { v4 as uuid } from "uuid";
import { Center, Grid, Title } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { MobMemberLocal } from "../../components/MobMember";
import {
  selectLocalMobSession,
  setUpLocalMembers,
} from "../../store/LocalMobSession";
import MobTimerLocal from "../../components/MobTimerLocal";
import AddNewMemberForm from "../../components/AddNewMember";
import useStyles from "./style";
import { useEffect } from "react";

const LocalSession = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const localMobSession = useSelector(selectLocalMobSession);

  const getCurrentDriver = localMobSession.members.find(
    (m) => m.turn === localMobSession.currentTurn
  );

  const geNoneDriverMembersList = localMobSession.members.filter(
    (m) => m.turn !== localMobSession.currentTurn
  );

  useEffect(() => {
    const savedLocal = window.localStorage.getItem("localSession");

    if (savedLocal) {
      const savedMembers = JSON.parse(savedLocal);
      dispatch(setUpLocalMembers(savedMembers));
    }
  }, []);

  useEffect(() =>
    window.localStorage.setItem(
      "localSession",
      JSON.stringify(localMobSession.members)
    )
  );

  return (
    <Grid justify='center'>
      <Center component={Grid.Col} pb='xl'>
        <Title className={classes.title}>Driver</Title>
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

export default LocalSession;
