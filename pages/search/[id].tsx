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
  // console.log(query, page);
  const { classes } = useStyles();
  console.log("🐞", query);

  const {
    data: searchData,
    isLoading: searchIsLoading,
    isSuccess: searchIsSuccess,
  } = useQuery(["searchMulti", query, page], () => getSearchMulti(query, page));
  searchIsSuccess && console.log("🐱", searchData.results[0].title);

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
        {searchIsSuccess &&
          searchData.results.map((tr: any) => (
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
                  <Link href={`/movie/${tr.id}`}>
                    <Image
                      layout="responsive"
                      objectFit="cover"
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
                    {tr.release_date?.slice(0, 4)}
                  </Text>
                  <Text className={classes.title} mt={5}>
                    {tr.title}
                  </Text>
                </Card.Section>
              </Card>
            </>
          ))}
      </SimpleGrid>

      <Flex justify="flex-end" dir="row" align="center">
      <Link href={`/movie/popular/${page - 1}`}>
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
        {page} of {searchData?.total_pages}
      </Text>
      <Link href={`/movie/popular/${page + 1}`}>
        <Button disabled={page === 1000} color="yellow">
          Next
        </Button>
      </Link>
    </Flex>
    </Container>
  );
}
