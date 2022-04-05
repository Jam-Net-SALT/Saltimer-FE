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
import { AuthProvider } from "../../services/AuthProvider";
import ProtectedRoute from "../../components/ProtectedRoute";
import { SaltimerProvider } from "../../services/SaltimerProvider";

const App = () => {
  const dispatch = useDispatch();
  const themeScheme = useSelector(selectThemeScheme);

  return (
    <ColorSchemeProvider
      colorScheme={themeScheme}
      toggleColorScheme={() => dispatch(toggleColorScheme())}
    >
      <MantineProvider theme={{ colorScheme: themeScheme }}>
        <AuthProvider>
          <Layout>
            <Container>
              <Routes>
                <Route
                  path='/'
                  element={<ProtectedRoute render={<HomePage />} />}
                />
                <Route path='/auth' element={<AuthPage />} />
                <Route
                  path='/join'
                  element={
                    <SaltimerProvider>
                      <ProtectedRoute render={<JoinSessionPage />} />
                    </SaltimerProvider>
                  }
                />
                <Route
                  path='/session/:id'
                  element={<ProtectedRoute render={<SettingsPage />} />}
                />
              </Routes>
            </Container>
          </Layout>
        </AuthProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
