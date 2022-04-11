import { Avatar, Button, Center, Grid, Loader, Title } from "@mantine/core";
import React, { useState } from "react";
import { MobMemberLocalProp, MobMemberRemoteProp } from "./type";
import useStyle from "./style";
import { useDispatch } from "react-redux";
import { removeMember } from "../../store/LocalMobSession";
import EditLocalMember from "../EditLocalMember";

export const MobMemberLocal = ({ user }: MobMemberLocalProp) => {
  const { classes } = useStyle();
  const dispatch = useDispatch();
  const [openedEditModal, setOpenedEditModal] = useState(false);

  if (!user) return <Loader />;

  return (
    <Grid style={{ width: "fit-content" }}>
      <Grid.Col>
        <Center>
          <Avatar
            src={user?.imageUrl}
            alt={user?.name}
            radius={100}
            size='lg'
            color='orange'
          >
            {user?.name.match(/\b(\w)/g)}
          </Avatar>
        </Center>
      </Grid.Col>
      <Grid.Col>
        <Center>
          <Title order={3} className={classes.nameText}>
            {user?.name}
          </Title>
        </Center>
      </Grid.Col>
      <Grid.Col>
        <Center>
          <Button
            variant='filled'
            color='red'
            radius='lg'
            mx='md'
            onClick={() => dispatch(removeMember(user))}
          >
            Remove
          </Button>
          <Button
            variant='outline'
            radius='lg'
            mx='md'
            onClick={() => setOpenedEditModal(true)}
          >
            Edit
          </Button>
          <EditLocalMember
            isOpen={openedEditModal}
            onClose={() => setOpenedEditModal(false)}
            user={user}
          />
        </Center>
      </Grid.Col>
    </Grid>
  );
};

export const MobMemberRemote = ({ user }: MobMemberRemoteProp) => {
  const { classes } = useStyle();
  return (
    <Grid style={{ width: "fit-content" }}>
      <Grid.Col>
        <Center>
          <Avatar
            src={user?.profileImage}
            alt={user?.fullName}
            radius={100}
            size='lg'
            color='violet'
          >
            {user?.fullName.match(/\b(\w)/g)}
          </Avatar>
        </Center>
      </Grid.Col>
      <Grid.Col>
        <Center>
          <Title order={2} className={classes.nameText}>
            {user?.firstName}
          </Title>
        </Center>
      </Grid.Col>
    </Grid>
  );
};
