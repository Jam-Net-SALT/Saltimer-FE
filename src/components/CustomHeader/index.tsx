import {
  Anchor,
  Burger,
  Grid,
  Header,
  MediaQuery,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { HeaderProps } from "./type";

function CustomHeader(props: HeaderProps) {
  const theme = useMantineTheme();
  return (
    <Header height={70} p='md'>
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan='sm' styles={{ display: "none" }}>
          <Burger
            opened={props.toolbarState}
            onClick={() => props.setToolBarState(!props.toolbarState)}
            size='sm'
            color={theme.colors.gray[6]}
            mr='xl'
          />
        </MediaQuery>

        <Grid style={{ width: "100vw" }} align='center' justify='space-between'>
          <Grid.Col span={3}>
            <Anchor component={Link} to='/'>
              <Title> Saltimer</Title>
            </Anchor>
          </Grid.Col>

          <Grid.Col span={2}>
            <Anchor component={Link} to='/auth'>
              Login / Register
            </Anchor>
          </Grid.Col>
        </Grid>
      </div>
    </Header>
  );
}

export default CustomHeader;
