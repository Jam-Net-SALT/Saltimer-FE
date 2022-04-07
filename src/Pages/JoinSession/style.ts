import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifySelf: "flex-start",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    // [`@media (max-width: ${theme.breakpoints.xl}px)`]: {

    // },
  },
  inputText: {
    width: "60%",
  },
  listContainer: {
    minHeight: "70vh",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      flexDirection: "column",
    },
  },
  emptyListText: {
    width: "100%",
    textAlign: "center",
  },
  errorMsg: {
    color: theme.colors.red,
  },
  sessionCard: {
    width: "25%",
    minWidth: "20rem",

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      width: "100%",
    },
  },
}));

export default useStyles;
