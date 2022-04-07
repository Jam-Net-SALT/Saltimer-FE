import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  title: {
    color: theme.colorScheme === "light" ? "rgba(0, 0, 0, 0.87)" : "#FF7A62",
  },
  text: {
    color: theme.colorScheme === "dark" ? "orange" : theme.colors.dark[8],
  },
}));

export default useStyles;
