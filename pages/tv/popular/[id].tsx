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
import React from "react";
import Link from "next/link";
import { getTVPopular } from "../../../api/popularTVAPi";
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

export default function TVPopular() {
  const router = useRouter();
  const page = Number(router.query.id);
  const { classes } = useStyles();
  const {
    data: tvPopularData,
    isLoading: tvPopularIsLoading,
    isSuccess: tvPopularIsSuccess,
  } = useQuery(["tvpopular", page], () => getTVPopular(page));

  let hasPrev = page > 0;
  let hasNext = page < tvPopularData?.total_pages;

  return (
    // <div>{router.query.id}</div>
    <Container>
      <Flex m={20}>
        <Text className={classes.fontStyle}>Popular</Text>
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
        {tvPopularIsLoading && <Text>Loading...</Text>}
        {tvPopularIsSuccess &&
          tvPopularData.results.map((tr: any) => (
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
                      width={0}
                      height={0}
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
        <Link href={`/tv/popular/${page - 1}`}>
        {!hasPrev || page === 1 ? (
            <Button
              data-disabled
              sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
              onClick={(e) => e.preventDefault()}
              color="yellow"
            >
              Previous
            </Button>
          ) : (
            <Button color="yellow">Previous</Button>
          )}
        </Link>
        <Text className={classes.paddingPagination}>
          {page} of {tvPopularData?.total_pages}
        </Text>
        <Link href={`/tv/popular/${page + 1}`}>
        {!hasNext || page === tvPopularData?.total_pages ? (
            <Button
              data-disabled
              sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
              onClick={(e) => e.preventDefault()}
              color="yellow"
            >
              Next 
            </Button>
          ) : (
            <Button color="yellow">Next</Button>
          )}
        </Link>
      </Flex>
    </Container>
  );
}
