import Link from "next/link";
import { SvgIcons } from "./SvgIcons";
import { useState } from "react";

const navItems = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "Menu",
		path: "/menu",
	},
	{
		name: "Contact",
		path: "/contact",
	},
	{
		name: "About",
		path: "/about",
	},
];

const HamburgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className={`hamburger-menu ${isOpen ? "open" : ""}`}>
			<div className="hamburger-menu__icons" onClick={toggleMenu}>
				{isOpen ? SvgIcons.CloseIcon : SvgIcons.HamburgerIcon}
			</div>
			{isOpen && (
				<ul className="hamburger-menu__links">
					{navItems.map((item) => (
						<li key={item.name}>
							<Link onClick={toggleMenu} href={item.path}>
								<p>{item.name}</p>
							</Link>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
};

export default HamburgerMenu;
