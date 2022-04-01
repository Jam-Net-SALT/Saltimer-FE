import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

export default useStyles;
