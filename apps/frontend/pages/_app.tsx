import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ProvideAuth, useAuth } from '../hooks';
import '../styles/globals.scss';

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
  const auth = useAuth();
  return (
    <ProvideAuth {...auth}>
      <Head>
        <title>finlab</title>
        <meta property="og:locale" content="en_US" />
      </Head>
      <main className="app bg-gradient-to-bl from-teal-300 to-blue-900 dark:from-teal-700 dark:to-indigo-900">
        <Component {...pageProps} />
      </main>
    </ProvideAuth>
  );
}

export default CustomApp;
