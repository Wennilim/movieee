import { createStyles, Card, Text } from "@mantine/core";
import React from "react";
const useStyles = createStyles((theme) => ({
  fontStyle: {
    fontFamily: "Verdana",
    fontWeight: 900,
    textShadow: " 1px 1px 2px orange, 0 0 1em yellow, 0 0 0.2em #ffbfbe",
    fontSize: 26,
    paddingLeft: 0,
  },
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    backgroundColor:'#F2BA39',

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
      backgroundColor: "#FBEDB4",
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));
type cardProps = {
  name: string;

}
export default function Cards({name}:cardProps):JSX.Element {
  const { classes } = useStyles();
  return (
    <Card
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <Text mt={5}>{name}</Text>
    </Card>
  );
}
