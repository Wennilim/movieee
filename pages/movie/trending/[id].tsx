import {
  AspectRatio,
  Button,
  Card,
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
  paddingPagination:{
    padding:10,
    textShadow: "#FC0 1px 0 10px;",
  }
}));
export default function Trending() {
  const router = useRouter();
 
  const [page, setPage] = useState(1);
  const { classes } = useStyles();
  const {
    data: trendingData,
    isLoading: trdIsLoading,
    isSuccess: trdIsSuccess,
  } = useQuery(["trending"], getTrending);
  //   console.log("🧘🏻‍♂️", trendingData);

  // const trending_card =
  //   trdIsSuccess &&
  //   trendingData.results.map((tr: any) => (
  //     <>
  //       <Card
  //         key={tr.id}
  //         p="md"
  //         radius="md"
  //         component="a"
  //         href=""
  //         className={classes.card}
  //       >
  //         {/* <AspectRatio ratio={1080 / 720}> */}
  //         <Image
  //           layout="fill"
  //           objectFit="cover"
  //           // width={470}
  //           // height={230}
  //           src={`https://image.tmdb.org/t/p/original/${tr.poster_path}`}
  //           // src={Dog}
  //           alt="pic"
  //         />
  //         {/* </AspectRatio> */}
  //       </Card>
  //     </>
  //   ));
  // console.log(page);
  // function handlePaginationChange() {
  //   // setPage(Number(router.query.id));
  //   // setPage(2)
  //   console.log(page);
  // }

  const old = Number(router.query.id);
  
  return (
    // <div>{router.query.id}</div>
    <Container>
      <SimpleGrid cols={6} breakpoints={[{ maxWidth: "sm", cols: 3 }]}>
        {trdIsSuccess &&
          trendingData.results.map((tr: any) => (
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
                  <Image
                    layout="responsive"
                    objectFit="cover"
                    width={0}
                    height={0}
                    src={`https://image.tmdb.org/t/p/original/${tr.poster_path}`}
                    // src={Dog}
                    alt="pic"
                  />
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


      <Flex justify='flex-end' dir='row' align='center'>
         <Button color='yellow' disabled={page === 1} onClick={() => setPage((old) => old - 1)}>
        Previous
      </Button>
      <Text className={classes.paddingPagination}>{page} of {trendingData?.total_pages}</Text>
      <Button color='yellow'  onClick={() => setPage((old) => old + 1)}>
        Next
      </Button>
      </Flex>
     
      {/* <Pagination
        // withEdges
        total={10}
        page={page}
        onChange={handlePaginationChange}
        position="right"
        styles={(theme) => ({
          item: {
            "&[data-active]": {
              backgroundImage: theme.fn.gradient({ from: "red", to: "yellow" }),
            },
          },
        })}
      /> */}
    </Container>
  );
}
