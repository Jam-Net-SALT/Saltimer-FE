import { Card, Tabs } from "@mantine/core";
import React from "react";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";

const AuthPage = () => {
  return (
    <Card shadow='xl' sx={{ width: 450, '@media(max-width: 500px)': {width: 300} }} >
      <Tabs color='pink' grow position='center' variant='outline' >
        <Tabs.Tab label='Log in'>
          <LoginForm />
        </Tabs.Tab>
        <Tabs.Tab label='Sign up'>
          <SignupForm />
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};

export default AuthPage;
