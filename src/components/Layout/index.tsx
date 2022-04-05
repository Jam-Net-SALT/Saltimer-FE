import { AppShell, useMantineTheme } from "@mantine/core";
import CustomHeader from "../CustomHeader";
import CustomFooter from "../CustomFooter";
import NavigationBar from "../NavigationBar";
import { LayoutProps } from "./type";
import { useSelector } from "react-redux";
import { selectShowSideBar } from "../../store/SiteConfig";
import { selectLocalMobSession } from "../../store/LocalMobSession";

const Layout = (props: LayoutProps) => {
  const theme = useMantineTheme();
  const showSideBar = useSelector(selectShowSideBar);
  const localMobSession = useSelector(selectLocalMobSession);

  const getBackgroundImage = () =>
    theme.colorScheme === "dark"
      ? localMobSession.backgroundImageUrlDark
      : localMobSession.backgroundImageUrl;

  return (
    <AppShell
      styles={{
        main: {
          display: "flex",
          background: `url(${getBackgroundImage()}) no-repeat center center fixed`,
          backgroundSize: "cover",
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      fixed
      navbar={showSideBar ? <NavigationBar /> : undefined}
      footer={<CustomFooter />}
      header={<CustomHeader />}
    >
      {props.children}
    </AppShell>
  );
};

export default Layout;
