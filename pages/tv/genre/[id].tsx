import {
  Button,
  Card,
  Code,
  Container,
  createStyles,
  Flex,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { getTVByCategory } from "../../../api/discoverAPI";

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
    fontSize: 16,
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

export default function TVCategory() {
  const router = useRouter();
  const page = Number(router.query.page);
  const categoryID = Number(router.query.id);
  const categoryName = router.query.name;

  const { classes } = useStyles();
  const {
    data: upData,
    isLoading: upIsLoading,
    isSuccess: upIsSuccess,
  } = useQuery(["tvbycategory", categoryID, page], () =>
    getTVByCategory(categoryID, page)
  );

  if (page < 1 || page > 1000) {
    return null;
  }
  {
    console.log(categoryID);
  }
  return (
    <Container>
      <Flex m={20}>
        <Text className={classes.fontStyle}>{categoryName}</Text>

        <Flex ml="md" align="flex-end">
          <Code color="pink">
            <Text
              variant="gradient"
              gradient={{ from: "purple", to: "pink", deg: 45 }}
              fw={800}
              fz={10}
            >
              TV
            </Text>
          </Code>
        </Flex>
      </Flex>
      <SimpleGrid cols={6} breakpoints={[{ maxWidth: "sm", cols: 3 }]}>
        {upIsLoading && <Text>Loading...</Text>}
        {upIsSuccess &&
          upData.results.map((tr: any) => (
            <>
              <Card
                key={tr.id}
                p="md"
                radius="md"
                component="a"
                href={`/tv/${tr.id}`}
                className={classes.card}
              >
                <Card.Section>
                  <Link href={`/tv/${tr.id}`}>
                    <Image
                      // layout="responsive"
                      // objectFit="cover"
                      // width={0}
                      // height={0}
                      width={140}
                      height={220}
                      src={`https://image.tmdb.org/t/p/original/${tr.poster_path}`}
                      alt="pic"
                    />
                  </Link>

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
        <Link
          href={`/tv/genre/${categoryID}?name=${categoryName}&page=${page - 1}`}
        >
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
          {page} of {upData?.total_pages}
        </Text>
        <Link
          href={`/tv/genre/${categoryID}?name=${categoryName}&page=${page + 1}`}
        >
          <Button disabled={page === 1000} color="yellow">
            Next
          </Button>
        </Link>
      </Flex>
    </Container>
  );
}
