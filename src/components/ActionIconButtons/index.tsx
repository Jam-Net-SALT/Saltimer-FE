import { ActionIcon, Anchor, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Settings } from "tabler-icons-react";

export const HomeNavIcon = () => {
  return (
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
  );
};

export const SearchNavIcon = () => {
  return (
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
  );
};

export const SettingsNavIcon = () => {
  return (
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
  );
};
