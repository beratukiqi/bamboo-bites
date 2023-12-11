import { useContext, useEffect } from "react";
import { SvgIcons } from "./SvgIcons";
import AppContext from "@/context/AppContext";
import Image from "next/image";

interface AddonItem {
  id: number;
  item: string;
  price: number;
  imgUrl: string;
}

interface AddonsProps {
  data: AddonItem[];
}

const Addons = ({ data }: AddonsProps) => {
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="extras-container__wrapper">
      {data &&
        data.map((item: any, i: number) => (
          <article className="extras-container">
            <img
              src={item.imgUrl}
              alt={`Top view image of the dish ${item.item}`}
              className="extras-container__image"
            />
            <section className="extras-container__info">
              <h3>{item.item}</h3>
              <span>
                <b>$</b>
                {item.price}
              </span>
              <button onClick={() => addToCart(item)}>
                {SvgIcons.AddIcon}
              </button>
            </section>
          </article>
        ))}
    </div>
  );
};

export default Addons;
