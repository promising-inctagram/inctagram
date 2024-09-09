import type { AppProps } from "next/app";
import '../src/app/styles/index.scss';
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
