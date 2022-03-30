import React from "react";
import SignupForm from "../SignupForm";
import {Tabs, Card} from "@mantine/core";
import LoginForm from "../LoginForm";


const LoginCard = () => {
    return (
        <Card shadow='xl' style={{width: 450}}>
            <Tabs color='pink' grow position='center' variant='outline'>
                <Tabs.Tab label="Sign Up"> <SignupForm/> </Tabs.Tab>
                <Tabs.Tab label="Log In"> <LoginForm/> </Tabs.Tab>
            </Tabs>
        </Card>
    );
};

export default LoginCard;
