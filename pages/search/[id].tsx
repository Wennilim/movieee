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
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { getSearchMulti } from "../../api/searchAPI";
import { shimmer, toBase64 } from "../../utils";
import noImg from "./noImg.png";
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
export default function SearchResultPage() {
  const router = useRouter();
  const page = Number(router.query.id);
  const query = router.query.query;
  const { classes } = useStyles();

  const {
    data: searchData,
    isLoading: searchIsLoading,
    isSuccess: searchIsSuccess,
  } = useQuery(["searchMulti", query, page], () => getSearchMulti(query, page));
  let hasPrev = page > 0;
  let hasNext = page < searchData?.total_pages;

  return (
    <Container>
      <Flex m={20}>
        <Text className={classes.fontStyle}>Search</Text>
      </Flex>
      <Flex fz={12} mb={15}>
        <Text>Search keywords: </Text>
        <Text fw={900}>{query}</Text>
      </Flex>
      <SimpleGrid cols={6} breakpoints={[{ maxWidth: "sm", cols: 3 }]}>
        {searchIsLoading && <Text>Loading...</Text>}
        {searchIsSuccess &&
          searchData.results.map((tr: any) => (
            <>
              <Card
                key={tr.id}
                p="md"
                radius="md"
                component="a"
                href={
                  tr.media_type === "tv" ? `/tv/${tr.id}` : `/movie/${tr.id}`
                }
                className={classes.card}
              >
                <Card.Section>
                  <Link
                    href={
                      tr.media_type === "movie"
                        ? `/movie/${tr.id}`
                        : `/tv/${tr.id}`
                    }
                  >
                    <Image
                      layout="responsive"
                      objectFit="cover"
                      width={0}
                      height={0}
                      src={`https://image.tmdb.org/t/p/original/${tr.poster_path}`}
                      alt="pic"
                      placeholder="blur"
                      unoptimized
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(350, 530)
                      )}`}
                    />
                    {/* {console.log('666',tr)} */}
                  </Link>

                  {/* </AspectRatio> */}
                  <Text
                    color="red"
                    size="xs"
                    transform="uppercase"
                    weight={700}
                    mt="md"
                  >
                    {tr.media_type === "movie"
                      ? tr.release_date?.slice(0, 4)
                      : tr.first_air_date?.slice(0, 4)}
                  </Text>
                  <Text className={classes.title} mt={5}>
                    {tr.media_type === "movie" ? tr.title : tr.name}
                  </Text>
                </Card.Section>
              </Card>
            </>
          ))}
      </SimpleGrid>

      <Flex justify="flex-end" dir="row" align="center">
        <Link href={`/search/${page - 1}?query=${query}`}>
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
          {page} of {searchData?.total_pages}
        </Text>
        <Link href={`/search/${page + 1}?query=${query}`}>
          {!hasNext || page === searchData?.total_pages ? (
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
function useState(): [any, any] {
  throw new Error("Function not implemented.");
}
