import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";

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
  {
    name: "Cart",
    path: "/cart",
  },
];

const Header = () => {
  return (
    <header className="header">
      <nav className="desktop-nav">
        <ul className="header__nav__links">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path}>
                <p>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <HamburgerMenu />
    </header>
  );
};

export default Header;
