import Image from "next/image";
import { SvgIcons } from "../SvgIcons";

const AboutInfo = () => {
	return (
		<section className="about-container">
			<Image
				width={1000}
				height={1000}
				className="about-img"
				src="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/owners_desktop_500x333.png"
				alt="Owners of Bamboo Bites"
			/>
			<h3 className="about-h3">
				We are so happy that you found your way here!
			</h3>
			<p className="about-p">
				Welcome into our world, where flavors tell stories, and each dish is a
				chapter of our journey. In 2016, we planted the seeds of our culinary
				adventure right here in Brooklyn, a borough our parents immigrated to in
				the '70s. As a young Asian couple, born from the fusion of Vietnam,
				Japan, and China, our roots run deep, woven into the fabric of every
				recipe. We are the torchbearers of our family's legacy, embracing the
				contrasts that define us.
			</p>

			<p className="about-p">
				Our take-away is more than a restaurant; it's a canvas where classic
				dishes are reborn with new textures, flavor symphonies, and vibrant
				hues. Like a tapestry, every creation tells a tale – the tale of our
				roots, our passion, and the vibrant essence of Brooklyn. What we do
				isn’t just about food; it’s about sharing the warmth of our heritage.
			</p>

			<p className="about-p">
				Join us in savoring the essence of our immigrant parents' kitchens, the
				love of our upbringing, and the joy we find in every bite. Explore our
				take-away, where the taste of home knows no borders.
			</p>

			<p className="about-sign">
				Sincerely,
				<br />
				Li and Kim
			</p>

			<section className="icon-container">{SvgIcons.BambooLeftIcon}</section>

			<h3 className="about-h3">Delightful Flavors Crafted with Care</h3>
			<p className="about-p">
				As passionate culinary artisans, we extend our commitment beyond taste
				to embrace the essence of responsible dining. At Bamboo Bites we
				prioritize your well-being, ensuring that every dish is not just a
				delight for the palate but a mindful choice for your health. We take
				pride in curating a menu where locally sourced ingredients take center
				stage. From farm to plate, we support local producers, ensuring a burst
				of freshness in every bite. We're not just crafting dishes; we're
				cultivating relationships within our community and reducing our
				environmental footprint.
			</p>
			<p className="about-p">
				Our dedication to inclusivity is showcased in the thoughtful use of
				Tamari. In every creation, this gluten-free soy sauce ensures that those
				with wheat allergies or gluten intolerance savor the rich depth of soy
				sauce without compromise. In a world where choices matter, we are proud
				to declare our commitment to being GMO-free. Our dishes are crafted with
				care, free from genetically modified organisms, ensuring your dining
				experience is a celebration of purity and taste. Join us in this
				culinary journey where every dish tells a tale of tradition, love, and a
				dedication to providing a memorable experience for every guest.
			</p>
		</section>
	);
};

export default AboutInfo;
