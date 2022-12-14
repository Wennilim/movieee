import React from "react";
import {
  Container,
  createStyles,
  Grid,
  Paper,
} from "@mantine/core";
import Cards from "../../components/Cards";
import { useQuery } from "@tanstack/react-query";
import { getTVCategory } from "../../api/genreApi";
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
const TV = () => {
  const { classes } = useStyles();
  const {
    data: mcData,
    isLoading: mcIsLoading,
    isSuccess: mcIsSuccess,
  } = useQuery(["tv category"], getTVCategory);
  return (
    <Container fluid m={80}>
      <Paper>
        <Grid grow>
        {mcIsLoading && <div>Loading...</div>}
          {mcIsSuccess &&
            mcData.genres.map((mc: any) => (
              <div key={mc.id}>
                <Grid.Col span='auto' lg={2}>
                  <Cards category="tv" name={mc.name} id={mc.id}/>
                </Grid.Col>
              </div>
            ))}
        </Grid>
      </Paper>
    </Container>
  )
}

export default TV