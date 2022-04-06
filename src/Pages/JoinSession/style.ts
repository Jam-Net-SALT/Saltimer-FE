import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    width: "90vw",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    // [`@media (max-width: ${theme.breakpoints.xl}px)`]: {

    // },
  },
  listContainer: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
  },
  emptyListText: {
    width: "100%",
    textAlign: "center",
  },
  errorMsg: {
    color: theme.colors.red,
  },
  sessionCard: {
    width: "fit-content",
  },
}));

export default useStyles;
