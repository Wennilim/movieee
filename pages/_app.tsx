import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Outlet from "../components/Outlet";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <title>Movieee</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/popcorn.svg" />
      </Head>
      <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          fontFamily: "Verdana, sans-serif",
        }}
      >
        <Outlet>
          <Component {...pageProps} />
        </Outlet>
      </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
