import AppProvider from "@/context/AppProvider";
import "../styling/general.scss";
import type { AppProps } from "next/app";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Header />
      <Component {...pageProps} />
    </AppProvider>
  );
}
