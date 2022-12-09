import Image from "next/image";
import { Flex, Text, createStyles, Paper, Code } from "@mantine/core";
import Dog from "../assets/dog.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper";

const useStyles = createStyles((theme) => ({
  fontStyle: {
    fontFamily: "Verdana",
    fontWeight: 900,
    textShadow: " 1px 1px 2px orange, 0 0 1em yellow, 0 0 0.2em #ffbfbe",
    fontSize: 26,
  },
}));

type Props ={
    selection:string;
};
export default function Trending({selection}:Props):JSX.Element {
  const { classes } = useStyles();

  return (
    <Flex align="flex-start">
      <Paper shadow="xl" radius="lg" p="md" ml={35} mt={30} w={1000}>
        <Flex m={20}>
          <Text className={classes.fontStyle}>Trending</Text>
          <Flex ml="md" align="flex-end">
            <Code color="blue">
              <Text
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                {selection}
              </Text>
            </Code>
          </Flex>
        </Flex>
        <Flex align="center" justify="center">
          <Swiper
            cssMode={true}
            slidesPerView={2}
            spaceBetween={10}
            slidesPerGroup={2}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Image width={400} height={400} src={Dog} alt="dog" />
            </SwiperSlide>

            <SwiperSlide>
              <Image width={400} height={400} src={Dog} alt="dog" />
            </SwiperSlide>

            <SwiperSlide>
              <Image width={400} height={400} src={Dog} alt="dog" />
            </SwiperSlide>

            <SwiperSlide>
              <Image width={400} height={400} src={Dog} alt="dog" />
            </SwiperSlide>
          </Swiper>
        </Flex>
      </Paper>
    </Flex>
  );
}
