import {
  Anchor,
  Burger,
  Button,
  Header,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextInterface } from "../../services/AuthProvider";
import { selectUser } from "../../store/CurrentUser";
import { selectShowSideBar, toggleSideBar } from "../../store/SiteConfig";
import { ThemeSchemeToggleIcon } from "../ActionIconButtons";
import useStyles from "./style";

function CustomHeader() {
  const { classes } = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const showSideBar = useSelector(selectShowSideBar);
  const auth = useContext<AuthContextInterface | null>(AuthContext);

  const onLogout = () => {
    auth?.logoutUser();
  };

  return (
    <Header height={70} p='md'>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Burger
            opened={showSideBar}
            onClick={() => dispatch(toggleSideBar())}
            size='sm'
            color={theme.colors.gray[6]}
            mr='xs'
          />
          <Anchor component={Link} to='/'>
            <Title align='center' order={2} className={classes.textColor}>
              {" "}
              Saltimer
            </Title>
          </Anchor>
        </div>
        <div className={classes.container}>
          {user ? (
            <Button
              variant='subtle'
              onClick={onLogout}
              className={classes.textColor}
            >
              Logout
            </Button>
          ) : (
            <Anchor
              component={Link}
              to='/auth'
              pr='lg'
              className={classes.textColor}
            >
              Login / Register
            </Anchor>
          )}

          <ThemeSchemeToggleIcon />
        </div>
      </div>
    </Header>
  );
}

export default CustomHeader;
