import { useContext, useEffect } from "react";
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
    Variations: [];
  };
}

interface MenuItemProps {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
}

const Modal = ({ isOpen, closeModal, food }: ModalProps) => {
  const { cart, setCart } = useContext(AppContext);
  const { id, item, price, imgUrl, desc, Variations } = food;

  useEffect(() => {
    console.log(food.Variations);
  }, []);

  const handleAddToCart = (foodItem: MenuItemProps) => {
    setCart((currentCart) => {
      // Check if the item is already in the cart
      const existingItemIndex = currentCart.findIndex(
        (item) => item.id === foodItem.id
      );

      // If the item exists, update its quantity
      if (existingItemIndex > -1) {
        const updatedCart = [...currentCart];
        const existingItem = updatedCart[existingItemIndex];
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        return updatedCart;
      }
      console.log("Added to cart");
      // If the item doesn't exist, add it to the cart
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
              <h3>{item}</h3>
              <button onClick={closeModal}>X</button>
            </motion.header>
            <motion.section className="modal-body" variants={childVariants}>
              <p className="modal-body__desc">{desc}</p>
              <ItemVariations variations={Variations} />
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
