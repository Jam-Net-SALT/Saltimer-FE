import { Center, Footer } from "@mantine/core";
import React from "react";
import useStyles from "./style";

const CustomFooter = () => {
  const { classes } = useStyles();
  return (
    <Footer height={35} p='xs'>
      <Center>
        <small className={classes.text}>Built by JamNet❤️</small>
      </Center>
    </Footer>
  );
};

export default CustomFooter;
