import Footer from "@/components/Footer";
import "../styling/general.scss";
import Header from "@/components/Header";
import AppProvider from "@/context/AppProvider";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { pathname } = router;
	console.log("PATHNAME", pathname);
	return (
		<AppProvider>
			{pathname !== "/admin" && <Header />}
			<Component {...pageProps} />
			{pathname !== "/admin" && <Footer />}
		</AppProvider>
	);
}
