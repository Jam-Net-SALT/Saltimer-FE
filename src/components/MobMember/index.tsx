import { Avatar, Center, Grid, Title } from "@mantine/core";
import React from "react";
import { MobMemberProp } from "./type";
import useStyle from "./style";

const MobMember = ({ user }: MobMemberProp) => {
  const { classes } = useStyle();
  return (
    <Grid style={{ width: "fit-content" }}>
      <Grid.Col>
        <Center>
          <Avatar src={user.imageUrl} alt="it's me" radius='xl' size='lg' />
        </Center>
      </Grid.Col>
      <Grid.Col>
        <Center>
          <Title order={2} className={classes.nameText}>
            {user.name}
          </Title>
        </Center>
      </Grid.Col>
    </Grid>
  );
};

export default MobMember;