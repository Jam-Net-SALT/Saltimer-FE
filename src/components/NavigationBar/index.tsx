import { ActionIcon, Center, Grid, Navbar, Text } from "@mantine/core";
import { NavigationBarProps } from "./type";
import { Home, Search, Settings } from "tabler-icons-react";

function NavigationBar(props: NavigationBarProps) {
  return (
    <Navbar
      p='md'
      hiddenBreakpoint='sm'
      hidden={!props.toolbarState}
      width={{ sm: 200, lg: 300 }}
    >
      <Grid>
        <Grid.Col style={{ display: "flex", alignItems: "center" }}>
          <ActionIcon color='orange'>
            <Home size={40} />
          </ActionIcon>
          <Text color='orange'>Home</Text>
        </Grid.Col>
        <Grid.Col style={{ display: "flex", alignItems: "center" }}>
          <ActionIcon color='orange'>
            <Search size={40} />
          </ActionIcon>
          <Text color='orange'>Join session</Text>
        </Grid.Col>
        <Grid.Col style={{ display: "flex", alignItems: "center" }}>
          <ActionIcon color='orange'>
            <Settings size={40} />
          </ActionIcon>
          <Text color='orange'>Settings</Text>
        </Grid.Col>
      </Grid>
    </Navbar>
  );
}

export default NavigationBar;
