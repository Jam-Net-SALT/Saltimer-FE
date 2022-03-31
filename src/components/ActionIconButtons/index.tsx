import { ActionIcon, Anchor, Text, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { Home, MoonStars, Search, Settings, Sun } from "tabler-icons-react";

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

export const ThemeSchemeToggleIcon = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <ActionIcon
      variant='outline'
      color={isDarkMode ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title='Toggle color scheme'
    >
      {isDarkMode ? <Sun size={40} /> : <MoonStars size={40} />}
    </ActionIcon>
  );
};