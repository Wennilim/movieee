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
import Link from "next/link";
  import React from "react";
  import { getUpcoming } from "../api/popularApi";
  const useStyles = createStyles((theme) => ({
    fontStyle: {
      fontFamily: "Verdana",
      fontWeight: 900,
      textShadow: " 1px 1px 2px orange, 0 0 1em yellow, 0 0 0.2em #ffbfbe",
      fontSize: 26,
      paddingLeft: 0,
    },
    card: {
      transition: "transform 150ms ease, box-shadow 150ms ease",
  
      "&:hover": {
        transform: "scale(1.01)",
        boxShadow: theme.shadows.md,
      },
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 600,
    },
  }));
  
  type CardProps = {
    image?: string;
    title?: string;
    media_type: string;
    year?: string;
  };
export default function NowPlaying({ media_type }: CardProps): JSX.Element {
    const { classes } = useStyles();
    const {
      data: upData,
      isLoading: upIsLoading,
      isSuccess: upIsSuccess,
    } = useQuery(["Upcoming"],() => getUpcoming());
    const cards = 
      upIsSuccess &&
      upData.results.slice(0, 4).map((up: any) => (
        <Card
          key={up.id}
          p="md"
          radius="md"
          component="a"
          href="#"
          className={classes.card}
        >
          <AspectRatio ratio={1920 / 1080}>
            <Link
             href={`/movie/${up.id}`}   
            >
              <Image
              width={470}
              height={230}
              src={`https://image.tmdb.org/t/p/original/${up.backdrop_path}`}
              alt="pic"
            />
            </Link>
          
          </AspectRatio>
          <Text
            color="red"
            size="xs"
            transform="uppercase"
            weight={700}
            mt="md"
          >
            {up.release_date.slice(0,4)}
          </Text>
          <Text className={classes.title} mt={5}>
            {up.title}
          </Text>
        </Card>
      ));
  
    // console.log(upData?.results[0].release_date.slice(0,4));
  return (
    <Flex align="flex-start">
    <Paper shadow="xl" radius="lg" p="md" ml={35} mt={30} w={1000}>
      <Flex align="center" justify="space-between">
        <Flex m={20}>
          <Text className={classes.fontStyle}>Upcoming</Text>
          <Flex ml="md" align="flex-end">
            <Code color="blue">
              <Text
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              >
                {media_type}
              </Text>
            </Code>
          </Flex>
        </Flex>
        <Button component={Link}  href="/movie/upcoming/1" variant="subtle" color="yellow" uppercase>
          See more
        </Button>
      </Flex>

      <Container py="xl">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </Container>
    </Paper>
  </Flex>
  )
}
