import {
  Anchor,
  Burger,
  Grid,
  Header,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectShowSideBar, toggleSideBar } from "../../store/SiteConfig";
import { ThemeSchemeToggleIcon } from "../ActionIconButtons";

function CustomHeader() {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const showSideBar = useSelector(selectShowSideBar);

  return (
    <Header height={70} p='md'>
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Burger
          opened={showSideBar}
          onClick={() => dispatch(toggleSideBar())}
          size='sm'
          color={theme.colors.gray[6]}
          mr='xl'
        />

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
            <ThemeSchemeToggleIcon />
          </Grid.Col>
        </Grid>
      </div>
    </Header>
  );
}

export default CustomHeader;
