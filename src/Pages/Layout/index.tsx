import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Footer,
  Text,
  useMantineTheme,
  Center,
  Container,
  SimpleGrid,
  Grid,
} from "@mantine/core";
import CustomHeader from "../../components/CustomHeader";
import CustomFooter from "../../components/CustomFooter";
import NavigationBar from "../../components/NavigationBar";
import LoginCard from "../../components/LoginCard";

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
          <Route path='/' element={<h1>Home page</h1>} />
          <Route path='/auth' element={<LoginCard />} />
          <Route path='/settings' element={<h1>Settings page</h1>} />
          <Route path='/session/:id' element={<h1>Mob session</h1>} />
        </Routes>
      </Container>
    </AppShell>
  );
};

export default Layout;
