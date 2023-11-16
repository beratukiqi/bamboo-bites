import { useState } from "react";
import Modal from "./Modal";

interface MenuItemProps {
  food: {
    id: string;
    item: string;
    price: number;
    desc: string;
    imgUrl: string;
  };
}

const MenuItem = ({ food }: MenuItemProps) => {
  const { id, item, price, imgUrl, desc } = food;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article
        onClick={() => setModalOpen(true)}
        className="menu-item__container"
      >
        <img
          src={imgUrl}
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
