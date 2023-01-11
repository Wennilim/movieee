import { Container, createStyles, Flex, Tabs } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Movie from "../components/Movie";
import TV from "../components/TV";
const useStyles = createStyles((theme) => ({}));

export default function Home() {
  const { classes } = useStyles();
  const matchesSmall = useMediaQuery("(min-width: 1024px)");
  return (
    <Container>
      {matchesSmall ? (
        <Tabs defaultValue="Movie" color="yellow">
          <Tabs.List grow>
            <Tabs.Tab value="Movie">Movie</Tabs.Tab>
            <Tabs.Tab color="yellow" value="TV">
              TV
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="Movie">
            <Movie />
          </Tabs.Panel>
          <Tabs.Panel value="TV">
            <TV />
          </Tabs.Panel>
        </Tabs>
      ) : (
        <Tabs defaultValue="Movie" color="yellow">
          <Tabs.List grow>
            <Tabs.Tab value="Movie">Movie</Tabs.Tab>
            <Tabs.Tab color="yellow" value="TV">
              TV
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="Movie">
            <Movie />
          </Tabs.Panel>
          <Tabs.Panel value="TV">
            <TV />
          </Tabs.Panel>
        </Tabs>
      )}
    </Container>
  );
}
