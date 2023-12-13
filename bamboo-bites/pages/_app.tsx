import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import AppProvider from "@/context/AppProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styling/general.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <AppProvider>
      {pathname !== "/admin" && <Header />}
      <Component {...pageProps} />
      {pathname !== "/admin" && <Footer />}
    </AppProvider>
  );
}
