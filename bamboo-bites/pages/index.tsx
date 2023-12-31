import { useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const Home = () => {
	const images = [
		"https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/01_slide_desktop_1440x1024.png",
		"https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/02_slide_desktop_1440x1024.png",
		"https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/03_slide_desktop_1440x1024.png",
	];

	const router = useRouter();

	// Change image after 3.5 seconds and repeat the cycle
	useEffect(() => {
		const element = document.querySelector(".hero__column") as HTMLElement; // Ensure correct class name

		let i = 0;
		const interval = setInterval(() => {
			element.style.backgroundImage = `url(${images[i]})`;
			i = (i + 1) % images.length;
		}, 3500);

		return () => clearInterval(interval); // Clear interval on unmount
	}, []);

	return (
		<PageWrapper id="home">
			<PageHeader landingpage title="Bamboo Bites" img={images[0]} />
			{/* <Link href="/menu">
				<Button title="MENU" action={() => {}} />
			</Link> */}
			<Button title="MENU" action={() => router.push("/menu")} />
		</PageWrapper>
	);
};

export default Home;
