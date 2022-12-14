import { useEffect, useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Box,
  MediaQuery,
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
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

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
  href: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  href,
  onClick,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Link href={href}>
      <Tooltip label={label} position="right" transitionDuration={0}>
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: active })}
        >
          <Icon stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    </Link>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home", path: "/" },
  { icon: IconMovie, label: "Movie", path: "/movie" },
  { icon: IconDeviceTv, label: "TV", path: "/tv" },
];

export default function Navibar() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      href={link.path}
      key={link.label}
      active={index === active}
      // onClick={() => {
      //   setActive(index);
      //   router.push(link.path);
      // }}
    />
  ));
  // console.log(router.pathname)

  useEffect(() => {
    if (router.pathname === "/movie") {
      setActive(1);
    } else if (router.pathname === "/tv") {
      setActive(2);
    } else {
      setActive(0);
    }
  }, [router.pathname]);
  const matchesSmall = useMediaQuery("(min-width: 1024px)");
  const { classes } = useStyles();
  return (
    <Box pos="fixed">
      <Navbar
        className={classes.br}
        height={500}
        width={{ base: 80 }}
        my="xl"
        pt="xl"
        p="md"
        sx={(theme) => ({
          backgroundColor: "#FBEDB4",
        })}
      >
        <Navbar.Section grow mt={110}>
          <Stack justify="center" spacing={35}>
            {links}
          </Stack>
        </Navbar.Section>
      </Navbar>
    </Box>
  );
}
