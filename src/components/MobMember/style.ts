import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  nameText: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[0]
        : theme.colors.dark[8],
  },
}));

export default useStyles;
