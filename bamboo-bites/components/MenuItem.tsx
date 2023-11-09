import { useState } from "react";
import Modal from "./Modal";

interface MenuItemProps {
  food: any;
  item: string;
  price: number;
  desc: string;
  img?: string;
}

const MenuItem = ({ food, item, price, desc, img }: MenuItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article
        onClick={() => setModalOpen(true)}
        className="menu-item__container"
      >
        <img
          // src={img}
          src="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
          alt={`Top view image of the dish ${item}`}
          className="menu-item__image"
        />
        <header className="menu-item__text">
          <h3>{item}</h3>
          <p>Dive into the world of Ambient Sushi, where...</p>
        </header>
        <span className="menu-item__price">
          {price}
          <b>$</b>
        </span>
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
