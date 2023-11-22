import { useContext, useEffect, useState } from "react";
import AppContext from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import ItemVariations from "./ItemVariations";
import ContentWrapper from "./ContentWrapper";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  food: {
    id: string;
    item: string;
    price: number;
    desc: string;
    imgUrl: string;
    protein: [];
  };
}

interface MenuItemProps {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
  protein: [];
  tweaks?: string[];
}

const Modal = ({ isOpen, closeModal, food }: ModalProps) => {
  const { cart, setCart } = useContext(AppContext);
  const { id, item, price, imgUrl, desc, protein } = food;
  const [tweaks, setTweaks] = useState<string[]>([]);

  useEffect(() => {
    console.log(food.protein);
  }, []);

  const handleAddToCart = (foodItem: MenuItemProps) => {
    setCart((currentCart) => {
      // Generate a unique identifier for the food item
      const foodItemIdWithTweaks =
        foodItem.id + (foodItem.tweaks?.join("") ?? "");

      // Check if the item is already in the cart
      const existingItemIndex = currentCart.findIndex(
        (item) => item.id === foodItemIdWithTweaks
      );

      // Check if the food item has tweaks
      const isTweaked = tweaks && tweaks.length > 0;

      // If the item has tweaks, treat it as unique and add to the cart
      if (isTweaked) {
        const tweakMatching = foodItem.tweaks === tweaks;

        console.log("Tweaks", tweaks);
        console.log("FoodItemTweaks", foodItem.tweaks);

        if (tweakMatching) {
          console.log("Added matching tweaked item to cart");
          const updatedCart = [...currentCart];
          const existingItem = updatedCart[existingItemIndex];
          updatedCart[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };
          return updatedCart;
        }

        console.log("Added unique tweaked item to cart");
        return [
          ...currentCart,
          {
            ...foodItem,
            quantity: 1,
            tweaks: tweaks,
            id: foodItem.id + tweaks.join(""),
          },
        ];
      }

      // If the item exists and no tweaks, update its quantity
      if (existingItemIndex > -1) {
        const updatedCart = [...currentCart];
        const existingItem = updatedCart[existingItemIndex];
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        return updatedCart;
      }

      // If the item exists and has tweaks, update its quantity
      if (existingItemIndex > -1 && isTweaked) {
        const updatedCart = [...currentCart];
        const existingItem = updatedCart[existingItemIndex];
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          tweaks: tweaks,
        };
        return updatedCart;
      }

      // If the item doesn't exist, add it to the cart
      console.log("Added to cart");
      return [...currentCart, { ...foodItem, quantity: 1 }];
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          className="modal"
          onClick={closeModal}
        >
          <motion.article
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.header
              style={{
                backgroundImage: `url(${imgUrl})`,
              }}
              className="modal-header"
              variants={childVariants}
            >
              {/* <h3>{item}</h3> */}
              <button onClick={closeModal}>X</button>
            </motion.header>
            <motion.section className="modal-body" variants={childVariants}>
              <h2>{item}</h2>
              <p className="modal-body__desc">{desc}</p>
              <ItemVariations variations={protein} setTweaks={setTweaks} />
              <h6 className="modal-body__price">
                <b>$</b>
                {price}
              </h6>
              <Button
                title="Add to cart"
                action={() => handleAddToCart(food)}
              />
            </motion.section>
          </motion.article>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Modal;

const containerVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};
