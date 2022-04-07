import {
  Anchor,
  Avatar,
  Button,
  Center,
  Header,
  Modal,
  Text,
} from "@mantine/core";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextInterface } from "../../services/AuthProvider";
import { selectUser } from "../../store/CurrentUser";
import { selectThemeScheme } from "../../store/SiteConfig";
import { ThemeSchemeToggleIcon } from "../ActionIconButtons";
import UserProfile from "../UserProfile";
import useStyles from "./style";

function CustomHeader() {
  const { classes } = useStyles();
  const user = useSelector(selectUser);
  const [modalOpened, setModalOpened] = useState(false);
  const themeScheme = useSelector(selectThemeScheme);
  const auth = useContext<AuthContextInterface | null>(AuthContext);

  const onLogout = () => {
    auth?.logoutUser();
  };

  return (
    <Header height={70} p='sx'>
      <div className={classes.wrapper}>
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title='Create new mobtimer'
        >
          <UserProfile onClose={() => setModalOpened(false)} />
        </Modal>
        <Anchor component={Link} to='/' className={classes.logoLink} pt='xs'>
          <img src={"/saltimer.png"} alt='Saltimer' width={140} height='auto' />
        </Anchor>
        <div className={classes.container}>
          <ThemeSchemeToggleIcon />
          {user ? (
            <>
              <Center
                onClick={() => setModalOpened(true)}
                className={classes.link}
              >
                <Avatar
                  src={user?.profileImage}
                  alt={user?.username}
                  radius='lg'
                  size='sm'
                  mr='xs'
                  color={themeScheme === "dark" ? "orange" : "orange"}
                >
                  {user?.fullName.match(/\b(\w)/g)}
                </Avatar>
                <Text mr='xs'>{user.fullName}</Text>
              </Center>
              <Button
                variant='outline'
                radius='lg'
                color={themeScheme === "dark" ? "orange" : "orange"}
                onClick={onLogout}
                className={classes.textColor}
              >
                Logout
              </Button>
            </>
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
        </div>
      </div>
    </Header>
  );
}

export default CustomHeader;
