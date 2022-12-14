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
  import React from "react";
  import { getTVAiring } from "../../api/popularTVAPi";
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
  
  export default function AiringToday({ media_type }: CardProps): JSX.Element {
    const { classes } = useStyles();
    const {
      data: arData,
      isLoading: arIsLoading,
      isSuccess: arIsSuccess,
    } = useQuery(["airing"], getTVAiring);
    const cards = 
      arIsSuccess &&
      arData.results.slice(0, 4).map((ar: any) => (
        <Card
          key={ar.id}
          p="md"
          radius="md"
          component="a"
          href="#"
          className={classes.card}
        >
          <AspectRatio ratio={1920 / 1080}>
            <Image
              width={470}
              height={230}
              src={`https://image.tmdb.org/t/p/original/${ar.backdrop_path}`}
              alt="pic"
            />
          </AspectRatio>
          <Text
            color="red"
            size="xs"
            transform="uppercase"
            weight={700}
            mt="md"
          >
            {ar.first_air_date?.slice(0,4)}
          </Text>
          <Text className={classes.title} mt={5}>
            {ar.name}
          </Text>
        </Card>
      ));
  
    console.log('🏀',arData);
    return (
      <Flex align="flex-start">
        <Paper shadow="xl" radius="lg" p="md" ml={35} mt={30} w={1000}>
          <Flex align="center" justify="space-between">
            <Flex m={20}>
              <Text className={classes.fontStyle}>Airing Today</Text>
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
  
          <Container py="xl">
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
              {cards}
            </SimpleGrid>
          </Container>
        </Paper>
      </Flex>
    );
  }
  