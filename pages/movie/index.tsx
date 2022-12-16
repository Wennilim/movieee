import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  createStyles,
  Flex,
  Grid,
  Paper,
  Text,
} from "@mantine/core";
import Cards from "../../components/Cards";
import { useQuery } from "@tanstack/react-query";
import { getMovieCategory } from "../../api/genreApi";

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

const Movie = () => {
  const { classes } = useStyles();
  const {
    data: mcData,
    isLoading: mcIsLoading,
    isSuccess: mcIsSuccess,
  } = useQuery(["movie category"], getMovieCategory);
  return (
    <Container fluid m={120}>
      <Flex justify='center' align='center'>
        <Grid grow>
        {mcIsLoading && <div>Loading...</div>}
          {mcIsSuccess &&
            mcData.genres.map((mc: any) => (
              <div key={mc.id}>
                <Grid.Col span={5} lg={2}>
                  <Cards name={mc.name} />
                </Grid.Col>
              </div>
            ))}
        </Grid>
      </Flex>
    </Container>
  );
};

export default Movie;
