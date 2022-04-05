import {
  Anchor,
  Avatar,
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
import {
  selectShowSideBar,
  selectThemeScheme,
  toggleSideBar,
} from "../../store/SiteConfig";
import { ThemeSchemeToggleIcon } from "../ActionIconButtons";
import useStyles from "./style";

function CustomHeader() {
  const { classes } = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const showSideBar = useSelector(selectShowSideBar);
  const themeScheme = useSelector(selectThemeScheme);
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
              variant='outline'
              mr='md'
              radius='lg'
              color={themeScheme === "dark" ? "orange" : "orange"} //TODO change first to violet when figured out how to make gradient color change on dark mode
              onClick={onLogout}
              className={classes.textColor}
            >
              <Avatar
                src={user?.profileImage}
                alt={user?.username}
                radius='lg'
                size='sm'
                mr='sm'
                color={themeScheme === "dark" ? "orange" : "orange"} //TODO change first to violet when figured out how to make gradient color change on dark mode
              >
                {user?.fullName.match(/\b(\w)/g)}
              </Avatar>
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
