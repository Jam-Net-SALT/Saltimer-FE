import { AppShell, useMantineTheme } from "@mantine/core";
import CustomHeader from "../CustomHeader";
import CustomFooter from "../CustomFooter";
import NavigationBar from "../NavigationBar";

import { LayoutProps } from "./type";
import { useSelector } from "react-redux";
import { selectShowSideBar } from "../../store/SiteConfig";

const Layout = (props: LayoutProps) => {
  const theme = useMantineTheme();
  const showSideBar = useSelector(selectShowSideBar);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[1],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
