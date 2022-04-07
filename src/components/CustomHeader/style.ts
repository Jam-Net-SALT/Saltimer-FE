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
    alignSelf: "center",
    paddingRight: "2rem",
  },
  textColor: {
    color: theme.colorScheme === "light" ? "rgba(0, 0, 0, 0.87)" : "#FF7A62",
  },
  link: {
    color: theme.colorScheme === "light" ? "rgba(0, 0, 0, 0.87)" : "#FF7A62",
    textDecoration: "none",
    display: "flex",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
  },
}));

export default useStyles;
