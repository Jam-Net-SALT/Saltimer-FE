import { Grid, Navbar } from "@mantine/core";
import {
  HomeNavIcon,
  SearchNavIcon,
  SettingsNavIcon,
  AdMobIcon
} from "../ActionIconButtons";
import { Space } from '@mantine/core';

function NavigationBar() {
  return (
    <Navbar p='md' width={{ sm: 150, lg: 200 }} >
      <Grid style={{ flexDirection: "column" }}>
        <Space h={"xs"} />
        <HomeNavIcon />
        <Space h={"xs"} />
        <SearchNavIcon />
        <Space h={"xs"} />
        <SettingsNavIcon />
        <Space h={"xs"} />
        <AdMobIcon />
        <Space h={"xs"} />
      </Grid>
    </Navbar>
  );
}

export default NavigationBar;
