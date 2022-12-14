import Image from "next/image";
import {
  Flex,
  Text,
  createStyles,
  Paper,
  Code,
  useMantineTheme,
  Button,
  Title,
  BackgroundImage,
  Box,
} from "@mantine/core";
import Dog from "../assets/dog.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";
import { getTVTrending } from "../../api/trendingApi";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";

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
  td: {
    paddingBottom: 15,
  },
  trendingMovie:{
    textShadow:'1px 1px 2px #F5634E, 0 0 1em #, 0 0 0.2em  #F1AD26',
    fontSize: 14
  }
}));
type CardProps = {
  image?: string;
  title?: string;
  media_type: string;
  year?: string;
};

// type Props = {
//   media_type: string;
// };
export default function Trending({ media_type }: CardProps): JSX.Element {
  const { classes } = useStyles();
  const {
    data: trendingData,
    isLoading: trdIsLoading,
    isSuccess: trdIsSuccess,
  } = useQuery(["tv trending"], getTVTrending);
  console.log("🍙", trendingData);
  return (
    <Flex align="flex-start">
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
          <Button variant="subtle" color="yellow" uppercase>
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
                      <Image
                        layout="responsive"
                        objectFit="contain"
                        width={470}
                        height={230}
                        src={`https://image.tmdb.org/t/p/original/${td.poster_path}`}
                        alt="poster img"
                      />
                      <div className={classes.title}>
                        {td.name}
                        <Text className={classes.trendingMovie}
                          variant="gradient"
                          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                        >
                          {td.media_type.toUpperCase()}
                        </Text>
                      </div>
                    </Box>
                  </SwiperSlide>
                </div>
              ))}
          </Swiper>
        </Flex>
      </Paper>
    </Flex>
  );
}

