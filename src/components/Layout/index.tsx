import { useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import CustomHeader from "../CustomHeader";
import CustomFooter from "../CustomFooter";
import NavigationBar from "../NavigationBar";

import { LayoutProps } from "./type";

const Layout = (props: LayoutProps) => {
  const theme = useMantineTheme();
  const [toolbar, setToolbar] = useState<boolean>(false);

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
      navbar={<NavigationBar toolbarState={toolbar} />}
      footer={<CustomFooter />}
      header={
        <CustomHeader toolbarState={toolbar} setToolBarState={setToolbar} />
      }
    >
      {props.children}
    </AppShell>
  );
};

export default Layout;
