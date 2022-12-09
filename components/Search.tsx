import { Input, createStyles } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  border: {
    border: 10,
    borderWidth: 30,
    borderColor: "red",
  },
  textStyle: {
    textShawdow: "#FC0 1px 0 10px",
  },
}));
export default function Search() {
  const { classes } = useStyles();
  return (
    <Input
      icon={<IconSearch />}
      placeholder="Search"
      radius="lg"
      size="lg"
      styles={(theme) => ({
        input: {
          '&:focus-within': {
            borderColor: theme.colors.orange[7],
          },
        },
      })}
    />
  );
}
