import { useContext, useEffect } from "react";
import AppContext from "@/context/AppContext";
import { AddonItem } from "@/interfaces";
import { SvgIcons } from "./SvgIcons";
import { motion } from "framer-motion";

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

  const sortedData = data.sort((a, b) => a.id - b.id);

  return (
    <div className="extras-container__wrapper">
      {sortedData &&
        sortedData.map((item: any, i: number) => (
          <article key={item + i} className="extras-container">
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
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0 }}
                onClick={() => addToCart(item)}
              >
                {SvgIcons.AddIcon}
              </motion.button>
            </section>
          </article>
        ))}
    </div>
  );
};

export default Addons;
