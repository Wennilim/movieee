import {
    Button,
    Container,
    createStyles,
    Flex,
    Grid,
    Text,
  } from "@mantine/core";
  import Image from "next/image";
  import Link from "next/link";
  import React, { useEffect, useState } from "react";
  // import Rating from "react-rating";
  import Dog from "../../assets/dog.jpeg";
  import { IconLink, IconMovie } from "@tabler/icons";
  import { getMovieCast, getMovieDetails } from "../../api/movieAPI";
  import { useQuery } from "@tanstack/react-query";
  import { useRouter } from "next/router";
import { getTVCast, getTVDetails } from "../../api/tvAPI";
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
      fontWeight: 900,
      color: "red",
      lineHeight: 1.2,
      fontSize: 18,
      marginTop: theme.spacing.xs,
      textShadow: "#FC0 1px 0 10px;",
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
    font: {
      fontFamily: "Verdana",
      fontWeight: 800,
      textShadow: " 1px 1px 2px orange, 0 0 1em yellow, 0 0 0.2em #ffbfbe",
      fontSize: 16,
      paddingLeft: 0,
    },
    cast: {
      fontSize: 12,
    },
    tagline:{
      color:'gray',
      opacity: 0.7 
    }
  }));
  export default function CardPage(): JSX.Element {
    const { classes } = useStyles();
    const router = useRouter();
    const [more, setMore] = useState(false);
    const [cast, setCast] = useState<any>([]);
    const tv_id = router.query.tvid;
    const {
      data: tvDetailsData,
      isLoading: tvdIsLoading,
      isSuccess: tvdIsSuccess,
    } = useQuery(["tvDetails", tv_id], () => getTVDetails(tv_id));
    const {
      data: tvCastsData,
      isLoading: tvcIsLoading,
      isSuccess: tvcIsSuccess,
    } = useQuery(["tvCasts", tv_id], () => getTVCast(tv_id));
  
    useEffect(() => {
      if (tvcIsSuccess) {
        if (more) {
          setCast(tvCastsData.cast);
        } else {
          setCast(tvCastsData.cast.slice(0, 6));
        }
      }
    }, [tvcIsSuccess, more, tvCastsData.cast]);
    console.log('🍎',tvDetailsData);
  
    return (
      <Container fluid>
        <Flex>
          <Image
            width={400}
            height={600}
            src={`https://image.tmdb.org/t/p/original/${tvDetailsData?.poster_path}`}
            alt="pic"
          />
          <Flex w={500} ml={30} direction="column">
            <Text className={classes.fontStyle} ml={20} fz={32} fw={800}>
              {tvDetailsData?.name}
            </Text>
            <Text className={classes.tagline} mt={10} ml={20}>{tvDetailsData?.tagline}</Text>
            {/* <Rating initialRating={5} readonly /> */}
            <Flex my={20} justify="space-around" direction="row">
              {/* <Flex direction="column">
                <Text className={classes.font} fw={800}>
                  Length
                </Text>
                <Text>{tvDetailsData?.episode_run_time} min</Text>
              </Flex> */}
              <Flex direction="column">
                <Text className={classes.font} fw={800}>
                  Language
                </Text>
                <Text>{tvDetailsData?.spoken_languages[0].english_name}</Text>
              </Flex>
              <Flex direction="column">
                <Text className={classes.font} fw={800}>
                  First Air
                </Text>
                <Text>{tvDetailsData?.first_air_date}</Text>
              </Flex>
              <Flex direction="column">
                <Text className={classes.font} fw={800}>
                  Last Air
                </Text>
                <Text>{tvDetailsData?.first_air_date}</Text>
              </Flex>
              <Flex direction="column">
                <Text className={classes.font} fw={800}>
                  Status
                </Text>
                <Text>{tvDetailsData?.status}</Text>
              </Flex>
            </Flex>
            <Flex ml={30} direction="column">
              <Text className={classes.font} fw={800}>
                Genres
              </Text>
              <Flex direction="row">
                {tvdIsSuccess &&
                  tvDetailsData.genres.map((md: any) => (
                    <Flex key={md.id} direction="row">
                      <Text ml={20}>{md.name}</Text>
                      <Text ml={10} className={classes.tagline}>|</Text>
                    </Flex>
                  ))}
              </Flex>
  
              <Flex mt={20} direction="column">
                <Text className={classes.font} fw={800}>
                  Synopsis
                </Text>
                <Text fz={13}>{tvDetailsData?.overview}</Text>
              </Flex>
  
              <Flex mt={20} direction="column">
                <Text className={classes.font} fw={800}>
                  Casts
                </Text>
                <Grid grow gutter="xl">
                  {tvcIsSuccess &&
                    cast.length !== 0 &&
                    cast?.map((mc: any) => (
                      <Grid.Col key={mc.id} className={classes.cast} span={4}>
                        {mc.name}
                      </Grid.Col>
                    ))}
                </Grid>
                <Button
                  onClick={() => setMore(!more)}
                  color="yellow"
                  variant="subtle"
                >
                  {more ? "Show Less" : "Show More"}
                </Button>
              </Flex>
  
              <Flex mt={30} direction="row">
                <Flex direction="column">
                  <a
                    href={tvDetailsData?.homepage}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      rightIcon={<IconLink />}
                      variant="outline"
                      color="yellow"
                    >
                      Website
                    </Button>
                  </a>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    );
  }
  