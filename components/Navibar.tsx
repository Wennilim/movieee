import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Box,
} from "@mantine/core";
import {
  TablerIcon,
  IconHome2,
  IconCategory,
  IconMovie,
  IconDeviceTv,
  // IconLogout,
  // IconSwitchHorizontal,
} from "@tabler/icons";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.lg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    opacity: 0.75,

    "&:hover": {
      opacity: 1,
      backgroundColor: "#fdc010",
    },
  },

  br: {
    borderRadius: 20,
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: "#f29a00",
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home", path: "/" },
  // { icon: IconCategory, label: "Category", path: "/" },
  { icon: IconMovie, label: "Movie", path: "movie" },
  { icon: IconDeviceTv, label: "TV", path: "tv" },
];

export default function Navibar() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        router.push(link.path);
      }}
    />
  ));
  const { classes } = useStyles();
  return (
    <Box pos='fixed'>
      <Navbar
        className={classes.br}
        height={650}
        // height={window.innerHeight}
        // style={{ minHeight: "1000px" }}
        width={{ base: 80 }}
        my="xl"
        pt="xl"
        p="md"
        sx={(theme) => ({
          backgroundColor: "#FBEDB4",
        })}
      >
        {/* <Center>
        <MantineLogo type="mark" inverted size={30} />
      </Center> */}
        <Navbar.Section grow mt={110}>
          <Stack justify="center" spacing={35}>
            {links}
          </Stack>
        </Navbar.Section>
        {/* <Navbar.Section>
        <Stack justify="center" spacing={20}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section> */}
      </Navbar>
    </Box>
  );
}
