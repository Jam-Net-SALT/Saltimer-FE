import { Grid, Navbar } from "@mantine/core";
import {
  HomeNavIcon,
  SearchNavIcon,
  SettingsNavIcon,
} from "../ActionIconButtons";

function NavigationBar() {
  return (
    <Navbar p='md' width={{ sm: 150, lg: 200 }} >
      <Grid style={{ flexDirection: "column" }}>
        <HomeNavIcon />
        <SearchNavIcon />
        <SettingsNavIcon />
      </Grid>
    </Navbar>
  );
}

export default NavigationBar;
