import { Card, Tabs } from "@mantine/core";
import React from "react";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";

const AuthPage = () => {
  return (
    <Card shadow='xl' style={{ width: 450 }}>
      <Tabs color='pink' grow position='center' variant='outline'>
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
