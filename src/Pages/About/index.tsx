import { Card, Tabs } from "@mantine/core";
import React from "react";
import UserProfile from "../../components/UserProfile";

const AboutPage = () => {
    return (
        <>
            <div id="overlay" style={{
                backdropFilter: 'blur(3px)',
                WebkitBackdropFilter: 'blur(3px)',
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0'
            }} />
            <Card shadow='xl' sx={{ '@media(max-width: 500px)': { width: 300 } }}>
                <Tabs color='pink' grow position='center' variant='outline'>
                    <Tabs.Tab label='Account Settings'>
                        <UserProfile />
                    </Tabs.Tab>
                    <Tabs.Tab label='Timer Settings'>
                        <title>Testing</title>
                    </Tabs.Tab>
                </Tabs>
            </Card>
        </>
    );
};


export default AboutPage;