import { ColorSchemeProvider, Container, MantineProvider } from "@mantine/core";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../../components/Layout";
import AuthPage from "../Auth";
import HomePage from "../Home";
import SettingsPage from "../Settings";
import JoinSessionPage from "../JoinSession";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeScheme, toggleColorScheme } from "../../store/SiteConfig";

const App = () => {
  const dispatch = useDispatch();
  const themeScheme = useSelector(selectThemeScheme);

  return (
    <ColorSchemeProvider
      colorScheme={themeScheme}
      toggleColorScheme={() => dispatch(toggleColorScheme)}
    >
      <MantineProvider theme={{ colorScheme: themeScheme }}>
        <Layout>
          <Container>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/auth' element={<AuthPage />} />
              <Route path='/settings' element={<SettingsPage />} />
              <Route path='/session/:id' element={<JoinSessionPage />} />
            </Routes>
          </Container>
        </Layout>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
