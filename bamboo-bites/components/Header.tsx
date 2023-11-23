import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SvgIcons } from "./SvgIcons";

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

const Header = () => {
	// Add active class to the link that is currently active
	const router = useRouter();
	const path = router.pathname;

	const handleActivePath = (path: string, itemName: string) => {
		if (path === "/" && itemName.toLowerCase() === "home") {
			return "active";
		}

		let currPath = path.replace("/", "");
		if (currPath === itemName.toLowerCase()) {
			return "active";
		}

		return "";
	};

	useEffect(() => {
		console.log(path);
	}, [path]);

	return (
		<header className="header">
			<nav className="desktop-nav">
				<ul className="header__nav__links">
					{navItems.map((item) => (
						<li key={item.name}>
							<Link
								href={item.path}
								className={handleActivePath(path, item.name)}
							>
								<p>{item.name}</p>
							</Link>
						</li>
					))}
				</ul>
				<Link href={"/cart"} className="cart-icon">
					{SvgIcons.CartIcon}
				</Link>
				{SvgIcons.HamburgerIcon}
			</nav>
			<HamburgerMenu />
		</header>
	);
};

export default Header;
