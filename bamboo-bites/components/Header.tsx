import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppContext from "@/context/AppContext";
import { useContext } from "react";
import { motion } from "framer-motion";

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

const hamBurgerIcon = (
  <svg
    className="hamburger-menu"
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 448 512"
  >
    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
  </svg>
);

const cartIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
  </svg>
);

const Header = () => {
  // Add active class to the link that is currently active
  const router = useRouter();
  const path = router.pathname;
  const { cart, setCart } = useContext(AppContext);
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    if (cart) {
      let qty = 0;

      cart.forEach((item) => {
        qty += item.quantity;
      });

      setCartQty(qty);
    }
  }, [cart]);

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
        <aside>
          <Link href={"/cart"} className="cart-icon">
            {cartIcon}
            {cartQty && (
              <motion.span
                key={cartQty}
                animate={{ scale: 1 }}
                initial={{ scale: 0.7 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="cart-qty"
              >
                {cartQty}
              </motion.span>
            )}
          </Link>
        </aside>
        {hamBurgerIcon}
      </nav>
      <HamburgerMenu />
    </header>
  );
};

export default Header;
