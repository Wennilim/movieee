import Image from "next/image";
import {
  Flex,
  Text,
  createStyles,
  Paper,
  Code,
  Button,
  Box,
  Container,
  SimpleGrid,
  Card,
} from "@mantine/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";
import { getTVTrending } from "../../api/trendingApi";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

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
  fontStyle2: {
    fontFamily: "Verdana",
    fontWeight: 900,
    textShadow: " 1px 1px 2px orange, 0 0 1em yellow, 0 0 0.2em #ffbfbe",
    fontSize: 16,
    paddingLeft: 0,
  },
  td: {
    paddingBottom: 15,
  },
  trendingMovie: {
    textShadow: "1px 1px 2px #F5634E, 0 0 1em #, 0 0 0.2em  #F1AD26",
    fontSize: 14,
    fontWeight: 800,
  },
}));
type CardProps = {
  image?: string;
  title?: string;
  media_type: string;
  year?: string;
};

export default function Trending({ media_type }: CardProps): JSX.Element {
  const { classes } = useStyles();
  const matchesSmall = useMediaQuery("(min-width: 1024px)");
  const mobileSize = useMediaQuery("(min-width: 320px)");
  const {
    data: trendingData,
    isLoading: trdIsLoading,
    isSuccess: trdIsSuccess,
  } = useQuery(["tv trending"], () => getTVTrending(1));

  const cards =
    trdIsSuccess &&
    trendingData.results.slice(0, 4).map((pd: any) => (
      <Card
        key={pd.id}
        p="md"
        radius="md"
        component="a"
        href={`/tv/${pd.id}`}
        className={classes.card}
      >
        <Link href={`/tv/${pd.id}`}>
          <Image
            width={470}
            height={220}
            src={`https://image.tmdb.org/t/p/original/${pd.backdrop_path}`}
            alt="pic"
          />
        </Link>

        <Text color="red" size="xs" transform="uppercase" weight={700} mt="md">
          {pd.first_air_date?.slice(0, 4)}
        </Text>
        <Text className={classes.title} mt={5}>
          {pd.name}
        </Text>
      </Card>
    ));
  return (
    <Flex align="flex-start">
      {matchesSmall ? (
        <Paper shadow="xl" radius="lg" p="md" ml={35} mt={30} w={1000}>
          <Flex align="center" justify="space-between">
            <Flex m={20}>
              <Text className={classes.fontStyle}>Trending</Text>
              <Flex ml="md" align="flex-end">
                <Code color="pink">
                  <Text
                    variant="gradient"
                    gradient={{ from: "purple", to: "pink", deg: 45 }}
                  >
                    {media_type}
                  </Text>
                </Code>
              </Flex>
            </Flex>
            <Button
              component={Link}
              href="/tv/trending/1"
              variant="subtle"
              color="yellow"
              uppercase
            >
              See more
            </Button>
          </Flex>

          <Flex align="center" justify="center">
            <Swiper
              cssMode={true}
              slidesPerView={3}
              spaceBetween={10}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              slidesPerGroup={2}
              pagination={false}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
              className="mySwiper"
            >
              {trdIsLoading && <div>Loading...</div>}
              {trdIsSuccess &&
                trendingData.results.map((td: any) => (
                  <div key={td.id}>
                    <SwiperSlide>
                      <Box
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "sticky",
                        }}
                      >
                        <Link href={`/tv/${td.id}`}>
                          <Image
                            layout="responsive"
                            objectFit="contain"
                            width={470}
                            height={230}
                            src={`https://image.tmdb.org/t/p/original/${td.poster_path}`}
                            alt="poster img"
                          />
                        </Link>

                        <div>
                          <Text className={classes.title}>{td.name}</Text>

                          <Flex mt={15}>
                            <Code
                              className={classes.trendingMovie}
                              color="yellow"
                              fw={800}
                            >
                              {td.media_type.toUpperCase()} •{" "}
                              {td.first_air_date?.slice(0, 4)}
                            </Code>
                          </Flex>
                        </div>
                      </Box>
                    </SwiperSlide>
                  </div>
                ))}
            </Swiper>
          </Flex>
        </Paper>
      ) : (
        <Flex ml={{ base: -28, lg: 30 }}>
          <Paper
            shadow="xl"
            radius="lg"
            p="md"
            w={{ base: 280, xs: 300, sm: 500, lg: 550 }}
          >
            <Flex align="center" justify="space-between">
              <Flex m={20}>
                <Text className={classes.fontStyle2}>Trending</Text>
                <Flex ml="md" align="flex-end">
                  <Code color="pink">
                    <Text
                      fz={8}
                      variant="gradient"
                      gradient={{ from: "purple", to: "pink", deg: 45 }}
                    >
                      {media_type}
                    </Text>
                  </Code>
                </Flex>
              </Flex>
              <Button
                fz={10}
                variant="subtle"
                color="yellow"
                uppercase
                component={Link}
                href="/tv/trending/1"
              >
                See more
              </Button>
            </Flex>
            <Container py="xl">
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: "lg", cols: 1 }]}>
                {cards}
              </SimpleGrid>
            </Container>
          </Paper>
        </Flex>
      )}
    </Flex>
  );
}
