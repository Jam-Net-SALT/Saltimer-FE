import { Grid, Navbar } from "@mantine/core";
import { NavigationBarProps } from "./type";
import {
  HomeNavIcon,
  SearchNavIcon,
  SettingsNavIcon,
} from "../ActionIconButtons";

function NavigationBar(props: NavigationBarProps) {
  return (
    <Navbar
      p='md'
      hiddenBreakpoint='sm'
      hidden={!props.toolbarState}
      width={{ sm: 200, lg: 300 }}
    >
      <Grid style={{ flexDirection: "column" }}>
        <HomeNavIcon />
        <SearchNavIcon />
        <SettingsNavIcon />
      </Grid>
    </Navbar>
  );
}

export default NavigationBar;
