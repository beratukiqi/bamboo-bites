import { useEffect, useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import AppContext from "@/context/AppContext";
import Link from "next/link";
import { SvgIcons } from "./SvgIcons";
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
];

const Header = () => {
  // Add active class to the link that is currently active
  const router = useRouter();
  const path = router.pathname;
  const { cart, setCart } = useContext(AppContext);
  const [cartQty, setCartQty] = useState(0);

  // Updates the cart quantity when cart is updated
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

  const MotionLink = motion(Link);

  return (
    <header className="header">
      <nav className="desktop-nav">
        <ul className="header__nav__links">
          {navItems.map((item) => (
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              key={item.name}
            >
              <Link
                href={item.path}
                className={handleActivePath(path, item.name)}
              >
                <p>{item.name}</p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      <aside>
        <MotionLink
          whileHover={{ scale: 1.1 }}
          href={"/cart"}
          className="cart-icon"
        >
          {SvgIcons.CartIcon}
          {cartQty > 0 && (
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
        </MotionLink>
      </aside>
      <HamburgerMenu />
    </header>
  );
};

export default Header;
