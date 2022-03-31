import { Grid, Navbar } from "@mantine/core";
import {
  HomeNavIcon,
  SearchNavIcon,
  SettingsNavIcon,
} from "../ActionIconButtons";

function NavigationBar() {
  return (
    <Navbar p='md' width={{ sm: 200, lg: 300 }}>
      <Grid style={{ flexDirection: "column" }}>
        <HomeNavIcon />
        <SearchNavIcon />
        <SettingsNavIcon />
      </Grid>
    </Navbar>
  );
}

export default NavigationBar;
