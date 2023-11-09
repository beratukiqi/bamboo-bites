import Link from "next/link";

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
  return (
    <header className="header">
      <div>
        <nav>
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
      </div>
    </header>
  );
};

export default Header;
