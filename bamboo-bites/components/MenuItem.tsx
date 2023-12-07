import { useContext, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { SvgIcons } from "./SvgIcons";
import AppContext from "@/context/AppContext";
import Image from "next/image";

interface MenuItemProps {
  food: {
    id: string;
    item: string;
    price: number;
    desc: string;
    imgUrl: string;
    protein: [];
    tweaks?: string[];
  };
}

const MenuItem = ({ food }: MenuItemProps) => {
  const { id, item, price, imgUrl, desc } = food;
  const [modalOpen, setModalOpen] = useState(false);
  const { cart, setCart } = useContext(AppContext);

  const handleAddItem = (event: any) => {
    event.stopPropagation();
    const itemInCart = cart.find((item) => item.id === id);
    if (itemInCart) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  return (
    <>
      <article
        onClick={() => setModalOpen(true)}
        className="menu-item__container"
      >
        <Image
          src={imgUrl}
          alt={`Top view image of the dish ${item}`}
          className="menu-item__image"
        />
        <header className="menu-item__text">
          <h2 className="h2-menu-item">{item}</h2>
          <p className="menu-descr">{desc}</p>
        </header>
        <span className="menu-item__price">
          <b>$</b>
          {price}
        </span>
        <button onClick={handleAddItem} className="menu-item__addBtn">
          {SvgIcons.AddIcon}
        </button>
      </article>
      <Modal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        food={food}
      />
    </>
  );
};

export default MenuItem;
