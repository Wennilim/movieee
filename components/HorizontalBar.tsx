import { useEffect, useState } from "react";
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Box,
  Flex,
} from "@mantine/core";
import {
  TablerIcon,
  IconHome2,
  IconCategory,
  IconMovie,
  IconDeviceTv,
} from "@tabler/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  link: {
    width: 40,
    height: 40,
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

export default function Navibar2() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      href={link.path}
      key={link.label}
      active={index === active}
    />
  ));

  useEffect(() => {
    if (router.pathname === "/movie") {
      setActive(1);
    } else if (router.pathname === "/tv") {
      setActive(2);
    } else {
      setActive(0);
    }
  }, [router.pathname]);

  const { classes } = useStyles();
  const mobileSize = useMediaQuery("(max-width: 320px)");
  return (
    <Box>
      {mobileSize ? (
        <Navbar
          className={classes.br}
          height={50}
          width={{ base: 230 }}
          ml={-34} 
          my="xs"
          pt="xl"
          // p="sm"
          sx={(theme) => ({
            backgroundColor: "#FBEDB4",
          })}
        >
          <Navbar.Section grow mt={-18}>
            <Flex justify="space-around">{links}</Flex>
          </Navbar.Section>
        </Navbar>
      ) : (
        <Navbar
          className={classes.br}
          height={50}
          width={{ base: 250 }}
          // mx='xl'
          // mx={{base:'sm', xs:'sm'}}
          my="xs"
          pt="xl"
          p="md"
          sx={(theme) => ({
            backgroundColor: "#FBEDB4",
          })}
        >
          <Navbar.Section grow mt={-18}>
            <Flex justify="space-around">{links}</Flex>
          </Navbar.Section>
        </Navbar>
      )}
    </Box>
  );
}
