import { useContext } from "react";
import { SvgIcons } from "./SvgIcons";
import AppContext from "@/context/AppContext";
import Image from "next/image";

interface ExtrasProps {
  id: string;
  item: string;
  price: number;
}

const Addons = ({ data }: ExtrasProps) => {
  const { cart, setCart } = useContext(AppContext);

  const addToCart = (extra: any) => {
    const itemInCart = cart.find((item) => item.id === extra.id);
    if (itemInCart) {
      setCart(
        cart.map((item) =>
          item.id === extra.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...extra, quantity: 1 }]);
    }
  };
  return (
    <>
      {data &&
        data.map((item: any, i: number) => (
          <article className="extras-item__container">
            <Image
              width={200}
              height={200}
              src={item.imgUrl}
              alt={`Top view image of the dish ${item.item}`}
              className="extras-item__image"
            />
            <header className="extras-item__text">
              <h3 className="h4-extras-item">{item.item}</h3>
              {/* <p className="menu-descr">{desc}</p> */}
            </header>
            <span className="extras-item__price">
              <b>$</b>
              {item.price}
            </span>
            <button
              onClick={() => addToCart(item)}
              className="extras-item__addBtn"
            >
              {SvgIcons.AddIcon}
            </button>
          </article>
        ))}
    </>
  );
};

export default Addons;
