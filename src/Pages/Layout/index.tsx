import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AppShell, useMantineTheme, Container } from "@mantine/core";
import CustomHeader from "../../components/CustomHeader";
import CustomFooter from "../../components/CustomFooter";
import NavigationBar from "../../components/NavigationBar";
import AuthPage from "../Auth";
import HomePage from "../Home";
import SettingsPage from "../Settings";
import JoinSessionPage from "../JoinSession";

const Layout = () => {
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
      <Container className='app__container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/session/:id' element={<JoinSessionPage />} />
        </Routes>
      </Container>
    </AppShell>
  );
};

export default Layout;
