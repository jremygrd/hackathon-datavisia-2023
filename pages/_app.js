import "../styles/styles.css";
import "../styles/transition.css";
import "../styles/globals.css";
import TransitionEffect from "../components/TransitionEffect";

export default function App({ Component, pageProps }) {
  return (
    <TransitionEffect>
        <Component {...pageProps} />
    </TransitionEffect>
  )
  
}
