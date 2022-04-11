import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  sessionCard: {
    width: "25%",
    minWidth: "20rem",

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      width: "100%",
    },
  },
}));

export default useStyles;
