import "../styles/styles.css";
import "../styles/transition.css";
import "../styles/globals.css";
import TransitionEffect from "../components/TransitionEffect";
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
      </Head>
    <TransitionEffect>
        <Component {...pageProps} />
    </TransitionEffect>
    </>
  )
  
}
