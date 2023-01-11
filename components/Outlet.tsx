import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navibar";
import Search from "../components/Search";
import styles from "../styles/Home.module.css";
import { Flex, Text, createStyles, Container, MediaQuery } from "@mantine/core";
import Logo from "../components/Logo";
import React from "react";
import picFooter from "../assets/footer.svg";
import Navibar2 from "./HorizontalBar";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  headerFont: {
    fontSize: 32,
    fontWeight: 900,
    fontFamily: "Verdana",
    marginLeft: 20,
    textShadow: "#FC0 1px 0 10px;",
    // marginTop: -30,
  },

  border: {
    border: 10,
    borderWidth: 30,
  },
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    zIndex: 999,
    // boxShadow:
    //   "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    // width: "100%",
  },
  footer: {
    textShadow: "#FC0 1px 0 20px;",
    fontWeight: 900,
    // color:'gray',
    // opacity: 0.5
  },
  footer2: {
    margin: 50,
  },
}));

// @ts-ignore
export default function Outlet({ children }) {
  const { classes } = useStyles();
  const matchesSmall = useMediaQuery("(min-width: 1224px)");
  const mobileSize = useMediaQuery('(max-width: 425px)');
  return (
    <div className={styles.container}>
      <Head>
        <title>Movieee</title>
        <link rel="icon" href="/popcorn.svg" />
      </Head>

      <Flex p={28} justify="space-between" className={classes.header}>
        <Flex className={classes.border}>
          {mobileSize?<div></div>: <Logo />}
         
          <Flex align="center">
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Text className={classes.headerFont}>Movieee</Text>
            </MediaQuery>
          </Flex>
        </Flex>
        {matchesSmall ? <div></div> : <Navibar2 />}
        <Search />
      </Flex>
      <Flex>
        {matchesSmall ? <Navbar /> : <div></div>}

        {/* @ts-ignore */}
        {children}
      </Flex>

      <footer className={classes.footer2}>
        <Flex direction="column" align="center">
          <Text
            fw={900}
            variant="gradient"
            gradient={{ from: "#0d253f", to: "#90cea1", deg: 45 }}
          >
            Powered by
          </Text>
          <Image width={50} height={50} src={picFooter} alt="footer" />
        </Flex>
      </footer>
    </div>
  );
}
