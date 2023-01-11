import {
  AspectRatio,
  Button,
  Card,
  Code,
  Container,
  createStyles,
  Flex,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getTrending } from "../../../api/trendingApi";
import { Pagination } from "@mantine/core";
import { ButtonGroup } from "@mantine/core/lib/Button/ButtonGroup/ButtonGroup";
import Link from "next/link";
import { getTVTrending } from "../../../api/trendingApi";
import {  getTVTopRated } from "../../../api/popularTVAPi";
const useStyles = createStyles((theme) => ({
  card: {
    height: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
    fontSize: 13,
  },

  category: {
    color: "white",
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  group: {
    padding: 20,
  },
  button: {
    marginLeft: 12,
  },
  fontStyle: {
    fontFamily: "Verdana",
    fontWeight: 900,
    textShadow: " 1px 1px 2px orange, 0 0 1em yellow, 0 0 0.2em #ffbfbe",
    fontSize: 26,
    paddingLeft: 0,
  },
  td: {
    paddingBottom: 15,
  },
  trendingMovie: {
    textShadow: "1px 1px 2px #F5634E, 0 0 1em #, 0 0 0.2em  #F1AD26",
    fontSize: 14,
  },
  paddingPagination: {
    padding: 10,
    textShadow: "#FC0 1px 0 10px;",
  },
  button01: {
    cursor: "not-allowed",
  },
}));

export default function TVTop() {
  const router = useRouter();
  const page = Number(router.query.id);
  const { classes } = useStyles();
  const {
    data: tvTopData,
    isLoading: tvTopIsLoading,
    isSuccess: tvTopIsSuccess,
  } = useQuery(["tvtop", page], () => getTVTopRated(page));

  if (page < 1 || page > 1000) {
    return null;
  }

  return (
    <Container>
      <Flex m={20}>
        <Text className={classes.fontStyle}>Top Rated</Text>
        <Flex ml="md" align="flex-end">
          <Code color="pink">
            <Text
              variant="gradient"
              gradient={{ from: "purple", to: "pink", deg: 45 }}
              fw={800}
              fz={10}
            >
              TV SERIES
            </Text>
          </Code>
        </Flex>
      </Flex>
      <SimpleGrid cols={6} breakpoints={[{ maxWidth: "xs", cols: 3 }]}>
        {tvTopIsSuccess &&
          tvTopData.results.map((tr: any) => (
            <>
              <Card
                key={tr.id}
                p="md"
                radius="md"
                component="a"
                href="#"
                className={classes.card}
              >
                <Card.Section>
                  {/* <AspectRatio ratio={470/230}> */}
                  <Link href={`/tv/${tr.id}`}>
                    <Image
                      layout="responsive"
                      objectFit="cover"
                      // width={0}
                      // height={0}
                      width={0}
                      height={0}
                      src={`https://image.tmdb.org/t/p/original/${tr.poster_path}`}
                      // src={Dog}
                      alt="pic"
                    />
                  </Link>

                  {/* </AspectRatio> */}
                  <Text
                    color="red"
                    size="xs"
                    transform="uppercase"
                    weight={700}
                    mt="md"
                  >
                    {tr.first_air_date?.slice(0, 4)}
                  </Text>
                  <Text className={classes.title} mt={5}>
                    {tr.name}
                  </Text>
                </Card.Section>
              </Card>
            </>
          ))}
      </SimpleGrid>

      <Flex justify="flex-end" dir="row" align="center">
        <Link href={`/tv/top/${page - 1}`}>
          <Button
            // data-disabled={page === 1}
            // sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
            // onClick={(event) => event.preventDefault()}
            disabled={page === 1}
            color="yellow"
          >
            Previous
          </Button>
        </Link>
        <Text className={classes.paddingPagination}>
          {page} of {tvTopData?.total_pages}
        </Text>
        <Link href={`/tv/top/${page + 1}`}>
          <Button disabled={page === 1000} color="yellow">
            Next
          </Button>
        </Link>
      </Flex>
    </Container>
  );
}
