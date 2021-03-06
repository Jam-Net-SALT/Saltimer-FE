import { ActionIcon, Anchor, Text, useMantineColorScheme } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  Home,
  MoonStars,
  PlayerPause,
  PlayerPlay,
  Search,
  LayoutGridAdd,
  Settings,
  Sun,
  QuestionMark,
} from "tabler-icons-react";
import { MobTimerButtonProps } from "./type";

export const HomeNavIcon = () => {
  return (
    <Anchor
      style={{ display: "flex", alignItems: "center" }}
      component={Link}
      to='/'
      color={"orange"}
    >
      <ActionIcon>
        <Home size={40} />
      </ActionIcon>
      <Text variant={"gradient"} gradient={{ from: "orange", to: "red" }}>
        Home
      </Text>
    </Anchor>
  );
};

export const SearchNavIcon = () => {
  return (
    <Anchor
      style={{ display: "flex", alignItems: "center" }}
      component={Link}
      color='orange'
      to='join'
    >
      <ActionIcon>
        <Search size={40} />
      </ActionIcon>
      <Text variant={"gradient"} gradient={{ from: "orange", to: "red" }}>
        Join session
      </Text>
    </Anchor>
  );
};

export const SettingsNavIcon = () => {
  return (
    <Anchor
      style={{ display: "flex", alignItems: "center" }}
      component={Link}
      to='/settings'
      color={"orange"}
    >
      <ActionIcon>
        <Settings size={40} />
      </ActionIcon>
      <Text variant={"gradient"} gradient={{ from: "orange", to: "red" }}>
        Settings
      </Text>
    </Anchor>
  );
};

export const AboutIcon = () => {
  return (
    <Anchor
      style={{ display: "flex", alignItems: "center" }}
      component={Link}
      to='/about'
      color={"orange"}
    >
      <ActionIcon>
        <QuestionMark size={40} />
      </ActionIcon>
      <Text variant={"gradient"} gradient={{ from: "orange", to: "red" }}>
        About
      </Text>
    </Anchor>
  );
};

export const AdMobIcon = () => {
  return (
    <Anchor
      style={{ display: "flex", alignItems: "center" }}
      component={Link}
      to='/addMob'
      color={"orange"}
    >
      <ActionIcon>
        <LayoutGridAdd size={40} />
      </ActionIcon>
      <Text variant={"gradient"} gradient={{ from: "orange", to: "red" }}>
        Add Mob
      </Text>
    </Anchor>
  );
};

export const ThemeSchemeToggleIcon = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <ActionIcon
      mr='lg'
      color={isDarkMode ? "orange" : "yellow"}
      onClick={() => toggleColorScheme()}
      title='Toggle color scheme'
    >
      {isDarkMode ? <Sun size={40} /> : <MoonStars size={40} />}
    </ActionIcon>
  );
};

export const MobTimerPauseButton = (props: MobTimerButtonProps) => {
  return (
    <ActionIcon
      variant='outline'
      radius='lg'
      mr='xl'
      onClick={() => props.handler()}
      title='Toggle color scheme'
    >
      <PlayerPause size={160} color='white' />
    </ActionIcon>
  );
};

export const MobTimerPlayButton = (props: MobTimerButtonProps) => {
  return (
    <ActionIcon
      variant='outline'
      radius='lg'
      mr='xl'
      onClick={() => props.handler()}
      title='Toggle color scheme'
    >
      <PlayerPlay size={100} color='white' />
    </ActionIcon>
  );
};
