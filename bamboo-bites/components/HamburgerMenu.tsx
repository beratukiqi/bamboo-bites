import Link from "next/link";
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
  {
    name: "Cart",
    path: "/cart",
  },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
      <div className="hamburger-menu__icons" onClick={toggleMenu}>
        {
          isOpen ? (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.2423 14.9346L22.175 20L27.2423 25.0654C27.3853 25.2083 27.4986 25.378 27.576 25.5648C27.6533 25.7515 27.6932 25.9517 27.6932 26.1538C27.6932 26.356 27.6533 26.5562 27.576 26.7429C27.4986 26.9297 27.3853 27.0994 27.2423 27.2423C27.0994 27.3852 26.9297 27.4986 26.7429 27.576C26.5562 27.6533 26.356 27.6932 26.1538 27.6932C25.9517 27.6932 25.7515 27.6533 25.5648 27.576C25.378 27.4986 25.2083 27.3852 25.0654 27.2423L20 22.175L14.9346 27.2423C14.7917 27.3852 14.622 27.4986 14.4352 27.576C14.2485 27.6533 14.0483 27.6932 13.8462 27.6932C13.644 27.6932 13.4438 27.6533 13.2571 27.576C13.0703 27.4986 12.9006 27.3852 12.7577 27.2423C12.6148 27.0994 12.5014 26.9297 12.424 26.7429C12.3467 26.5562 12.3068 26.356 12.3068 26.1538C12.3068 25.9517 12.3467 25.7515 12.424 25.5648C12.5014 25.378 12.6148 25.2083 12.7577 25.0654L17.825 20L12.7577 14.9346C12.469 14.6459 12.3068 14.2544 12.3068 13.8462C12.3068 13.4379 12.469 13.0464 12.7577 12.7577C13.0464 12.469 13.4379 12.3068 13.8462 12.3068C14.2544 12.3068 14.6459 12.469 14.9346 12.7577L20 17.825L25.0654 12.7577C25.2083 12.6147 25.378 12.5014 25.5648 12.424C25.7515 12.3466 25.9517 12.3068 26.1538 12.3068C26.356 12.3068 26.5562 12.3466 26.7429 12.424C26.9297 12.5014 27.0994 12.6147 27.2423 12.7577C27.3853 12.9006 27.4986 13.0703 27.576 13.2571C27.6533 13.4438 27.6932 13.644 27.6932 13.8462C27.6932 14.0483 27.6533 14.2485 27.576 14.4352C27.4986 14.622 27.3853 14.7917 27.2423 14.9346ZM40 20C40 23.9556 38.827 27.8224 36.6294 31.1114C34.4318 34.4004 31.3082 36.9638 27.6537 38.4776C23.9991 39.9913 19.9778 40.3874 16.0982 39.6157C12.2186 38.844 8.65492 36.9392 5.85787 34.1421C3.06082 31.3451 1.15601 27.7814 0.384303 23.9018C-0.387401 20.0222 0.00866569 16.0008 1.52242 12.3463C3.03617 8.69181 5.59962 5.56823 8.8886 3.37061C12.1776 1.17298 16.0444 0 20 0C25.3026 0.00559965 30.3864 2.11453 34.136 5.86405C37.8855 9.61356 39.9944 14.6974 40 20ZM36.9231 20C36.9231 16.6529 35.9306 13.381 34.071 10.598C32.2115 7.81505 29.5685 5.64598 26.4762 4.36511C23.3839 3.08425 19.9812 2.74911 16.6985 3.40209C13.4157 4.05508 10.4003 5.66684 8.03358 8.03358C5.66685 10.4003 4.05508 13.4157 3.4021 16.6985C2.74912 19.9812 3.08426 23.3839 4.36512 26.4762C5.64599 29.5685 7.81506 32.2115 10.598 34.071C13.381 35.9305 16.6529 36.9231 20 36.9231C24.4867 36.918 28.7882 35.1334 31.9608 31.9608C35.1334 28.7882 36.918 24.4867 36.9231 20Z" fill="white"/>
</svg>
          ) : (
            <svg width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.4167 29.1667C35.9477 29.1673 36.4584 29.3706 36.8445 29.7351C37.2306 30.0996 37.463 30.5978 37.4941 31.1279C37.5252 31.658 37.3528 32.18 37.0119 32.5872C36.6711 32.9943 36.1877 33.256 35.6604 33.3187L35.4167 33.3333H2.08333C1.55233 33.3327 1.0416 33.1294 0.655483 32.7649C0.269366 32.4004 0.0370104 31.9022 0.00589142 31.3721C-0.0252276 30.842 0.147239 30.32 0.488052 29.9128C0.828865 29.5057 1.3123 29.244 1.83958 29.1812L2.08333 29.1667H35.4167ZM35.4167 14.5833C35.9692 14.5833 36.4991 14.8028 36.8898 15.1935C37.2805 15.5842 37.5 16.1141 37.5 16.6667C37.5 17.2192 37.2805 17.7491 36.8898 18.1398C36.4991 18.5305 35.9692 18.75 35.4167 18.75H2.08333C1.5308 18.75 1.00089 18.5305 0.610194 18.1398C0.219493 17.7491 0 17.2192 0 16.6667C0 16.1141 0.219493 15.5842 0.610194 15.1935C1.00089 14.8028 1.5308 14.5833 2.08333 14.5833H35.4167ZM35.4167 0C35.9692 0 36.4991 0.219494 36.8898 0.610195C37.2805 1.0009 37.5 1.5308 37.5 2.08333C37.5 2.63587 37.2805 3.16577 36.8898 3.55647C36.4991 3.94717 35.9692 4.16667 35.4167 4.16667H2.08333C1.5308 4.16667 1.00089 3.94717 0.610194 3.55647C0.219493 3.16577 0 2.63587 0 2.08333C0 1.5308 0.219493 1.0009 0.610194 0.610195C1.00089 0.219494 1.5308 0 2.08333 0H35.4167Z" fill="white"/>
            </svg>
          )
        }
      </div>
      {
        isOpen && (
          <ul className="hamburger-menu__links">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link onClick={toggleMenu} href={item.path}>
                  <p>{item.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};

export default HamburgerMenu;
