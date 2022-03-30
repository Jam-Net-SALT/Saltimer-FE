import { ActionIcon, Anchor, Center, Grid, Navbar, Text } from "@mantine/core";
import { NavigationBarProps } from "./type";
import { Home, Search, Settings } from "tabler-icons-react";
import { Link } from "react-router-dom";

function NavigationBar(props: NavigationBarProps) {
  return (
    <Navbar
      p='md'
      hiddenBreakpoint='sm'
      hidden={!props.toolbarState}
      width={{ sm: 200, lg: 300 }}
    >
      <Grid style={{ flexDirection: "column" }}>
        <Anchor
          style={{ display: "flex", alignItems: "center" }}
          component={Link}
          to='/'
        >
          <ActionIcon>
            <Home size={40} />
          </ActionIcon>
          <Text>Home</Text>
        </Anchor>
        <Anchor
          style={{ display: "flex", alignItems: "center" }}
          component={Link}
          to='/settings'
        >
          <ActionIcon>
            <Search size={40} />
          </ActionIcon>
          <Text>Join session</Text>
        </Anchor>
        <Anchor
          style={{ display: "flex", alignItems: "center" }}
          component={Link}
          to='session/TestUrl'
        >
          <ActionIcon>
            <Settings size={40} />
          </ActionIcon>
          <Text>Settings</Text>
        </Anchor>
      </Grid>
    </Navbar>
  );
}

export default NavigationBar;
