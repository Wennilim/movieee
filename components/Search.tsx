import {
  Input,
  createStyles,
  MediaQuery,
  Button,
  Modal,
  Group,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSearchMulti } from "../api/searchAPI";

const useStyles = createStyles((theme) => ({
  border: {
    border: 10,
    borderWidth: 30,
    borderColor: "red",
  },
  search: {
    marginLeft: -10,
    marginTop: 15,
  },
  searchSize: {
    width: 30,
    height: 30,
  },
  searchPosition: {
    marginTop: -1,
  },
}));
export default function Search() {
  const { classes } = useStyles();
  const [opened, { close, open }] = useDisclosure(false);
  const [input, setInput] = useState("");
  const router = useRouter();
  const page = Number(router.query.id);
  const matchesSmall = useMediaQuery("(min-width: 1224px)");

  return (
    <>
      {matchesSmall ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search/1?query=${input}&page=${page}`);
            setInput("");
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            icon={
              <IconSearch className={classes.searchPosition} color="orange" />
            }
            placeholder="Search"
            radius="lg"
            size="md"
            styles={(theme) => ({
              input: {
                "&:focus-within": {
                  borderColor: theme.colors.orange[7],
                },
              },
            })}
          />
        </form>
      ) : (
        <>
          <Modal
            withCloseButton={false}
            centered
            opened={opened}
            onClose={close}
            size="auto"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/search/1?query=${input}&page=${page}`);
                setInput("");
                close();
              }}
            >
              <Input
                placeholder="Search Movie or TV"
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                icon={
                  <IconSearch
                    className={classes.searchPosition}
                    color="orange"
                  />
                }
              />
            </form>
          </Modal>
          <Group position="center">
            <Button
              onClick={open}
              className={classes.search}
              variant="subtle"
              color="yellow"
            >
              <IconSearch className={classes.searchSize} color="orange" />
            </Button>
          </Group>
        </>
      )}
    </>
  );
}
