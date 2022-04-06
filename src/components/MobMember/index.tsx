import { Avatar, Center, Grid, Title } from "@mantine/core";
import React from "react";
import { MobMemberLocalProp, MobMemberRemoteProp } from "./type";
import useStyle from "./style";

export const MobMemberLocal = ({ user }: MobMemberLocalProp) => {
  const { classes } = useStyle();
  return (
    <Grid style={{ width: "fit-content" }}>
      <Grid.Col>
        <Center>
          <Avatar
            src={user?.imageUrl}
            alt={user?.name}
            radius={100}
            size='lg'
            color='violet'
          >
            {user?.name.match(/\b(\w)/g)}
          </Avatar>
        </Center>
      </Grid.Col>
      <Grid.Col>
        <Center>
          <Title order={2} className={classes.nameText}>
            {user?.name}
          </Title>
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
