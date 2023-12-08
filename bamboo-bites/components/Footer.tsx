import { useState } from "react";
import { SvgIcons } from "./SvgIcons";

const Footer = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleFooter = () => {
		setIsOpen(!isOpen);
		console.log(isOpen ? "Closed" : "Open");
	};

	return (
		<div className={`footer ${isOpen ? "open" : "closed"}`}>
			<footer>
				<span className="footer-toggle" onClick={toggleFooter}>
					{isOpen ? SvgIcons.CaretDownIcon : SvgIcons.CaretUpIcon}
				</span>
				<section className="footer-container">
					{isOpen && (
						<section className="footer-left">
							<h3>Connect with Us Anywhere!</h3>
							<p>
								123 SUSHI STREET, <br />
								BROOKLYN, NY 11234
							</p>
							<p>(555) 123-4567</p>
							<p>order@bamboobites.com</p>
						</section>
					)}
					<section className="footer-center">
						{isOpen && <h3>Open Daily, 11 am - 11 pm</h3>}
					</section>
					{isOpen && (
						<section className="footer-right">
							<h3>Taste the Buzz on Social!</h3>
							<div className="social-icons">
								{SvgIcons.FacebookIcon}
								{SvgIcons.InstagramIcon}
								{SvgIcons.SnapchatIcon}
								{SvgIcons.TikTokIcon}
							</div>
							<p>
								All images on this website by{" "}
								<a
									href="https://www.freepik.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="freepik-link"
								>
									Freepik
								</a>
							</p>
						</section>
					)}
				</section>
			</footer>
		</div>
	);
};

export default Footer;
