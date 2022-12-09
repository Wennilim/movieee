import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navibar";
import Search from "../components/Search";
import styles from "../styles/Home.module.css";
import { Flex, Text, createStyles } from "@mantine/core";
import Logo from "../components/Logo";
import React from "react";

const useStyles = createStyles((theme) => ({
  headerFont: {
    fontSize: 32,
    fontWeight: 900,
    fontFamily: "Verdana",
    marginLeft: 20,
    textShadow: "#FC0 1px 0 10px;",
  },

  border: {
    border: 10,
    borderWidth: 30,
  },
}));

// @ts-ignore
export default function Outlet({ children }) {
  const { classes } = useStyles();
  return (
    <div className={styles.container}>
      <Head>
        <title>Movieee</title>
        <link rel="icon" href="/popcorn.svg" />
      </Head>

      <main>
        <Flex p={28} justify="space-between">
          <Flex className={classes.border}>
            <Logo />
            <Flex align="center">
              <Text className={classes.headerFont}>Movieee</Text>
            </Flex>
          </Flex>

          <Search />
        </Flex>
        <Flex dir="row">
            <Navbar />
        {/* @ts-ignore */}
        {children}
        </Flex>
      
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
