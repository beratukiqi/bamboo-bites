import "../styling/general.scss";
import Header from "@/components/Header";
import AppProvider from "@/context/AppProvider";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Header />
      <Component {...pageProps} />
    </AppProvider>
  );
}
