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
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getTVPopular } from "../../api/popularTVAPi";
import { shimmer, toBase64 } from '../../utils'
const useStyles = createStyles((theme) => ({
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

export default function Popular({ media_type }: CardProps): JSX.Element {
  const { classes } = useStyles();
  const matchesSmall = useMediaQuery("(min-width: 1024px)");
  const {
    data: popularData,
    isLoading: popularIsLoading,
    isSuccess: popularIsSuccess,
  } = useQuery(["popular TV"], () => getTVPopular());

  const cards =
    popularIsSuccess &&
    popularData.results.slice(0, 4).map((pd: any) => (
      <Card
        key={pd.id}
        p="md"
        radius="md"
        component="a"
        href={`/tv/${pd.id}`}
        className={classes.card}
      >
        <AspectRatio ratio={1920 / 1080}>
          <Link href={`/tv/${pd.id}`}>
            <Image
              width={470}
              height={230}
              src={`https://image.tmdb.org/t/p/original/${pd.backdrop_path}`}
              alt="pic"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(350,530))}`}
            />
          </Link>
        </AspectRatio>
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
              <Text className={classes.fontStyle}>Popular</Text>
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
              href="/tv/popular/1"
              variant="subtle"
              color="yellow"
              uppercase
            >
              See more
            </Button>
          </Flex>

          <Container py="xl">
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
              {cards}
            </SimpleGrid>
          </Container>
        </Paper>
      ) : (
        <Paper
          shadow="xl"
          radius="lg"
          p="md"
          mt={30}
          ml={{ base: -28, lg: 30 }}
          w={{ base: 280, xs: 300, sm: 500, lg: 550 }}
        >
          <Flex align="center" justify="space-between">
            <Flex m={20}>
              <Text className={classes.fontStyle2}>Popular</Text>
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
              component={Link}
              href="/tv/popular/1"
              variant="subtle"
              color="yellow"
              uppercase
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
      )}
    </Flex>
  );
}
