import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.scss';

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>finlab</title>
        <meta property="og:locale" content="en_US" />
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
