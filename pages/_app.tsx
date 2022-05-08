import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie, setCookies } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../components/Navigation/Header';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Poetry - Adrian Gabardo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <AppShell
              sx={(theme) => ({
                main: {
                  background:
                    theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
              })}
              navbarOffsetBreakpoint="sm"
              asideOffsetBreakpoint="sm"
              fixed
              header={<Header colorScheme={colorScheme} {...pageProps} />}
            >
              <Component {...pageProps} />
            </AppShell>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) ?? 'dark',
});
