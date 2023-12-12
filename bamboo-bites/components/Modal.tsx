import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppContext from "@/context/AppContext";
import Button from "./Button";
import ItemVariations from "./ItemVariations";
import { SvgIcons } from "./SvgIcons";

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
    allergen: string[];
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
interface TweakProps {
  allergens: { [key: string]: boolean };
  protein: string;
}

const Modal = ({ isOpen, closeModal, food }: ModalProps) => {
  const { setCart } = useContext(AppContext);
  const { item, price, imgUrl, desc, protein, allergen } = food;
  const [tweaks, setTweaks] = useState<TweakProps>({
    allergens: {},
    protein: "",
  });

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    console.log(food.protein);
  }, []);

  const hasTweaks = (tweaks: TweakProps) => {
    return (
      tweaks.protein !== "" ||
      Object.values(tweaks.allergens).some((value) => value)
    );
  };

  const renderFoodAllergenIcon = (allergen: string) => {
    switch (allergen) {
      case "Dairy free":
        return SvgIcons.DairyFree;
      case "Gluten free":
        return SvgIcons.GlutenFree;
      case "Nut free":
        return SvgIcons.NutFree;
      case "Vegan":
        return SvgIcons.VeganFood;
      default:
        return null;
    }
  };

  const handleAddToCart = (foodItem: MenuItemProps) => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1200);

    setCart((currentCart: any) => {
      const tweaksActive = hasTweaks(tweaks);
      // Serialize the tweaks object for a consistent identifier
      const tweaksIdentifier = tweaksActive ? JSON.stringify(tweaks) : "";
      const foodItemIdWithTweaks = foodItem.id + tweaksIdentifier;

      // Find if the item (with the exact tweaks) is already in the cart
      const existingItemIndex = currentCart.findIndex(
        (item: any) => item.id === foodItemIdWithTweaks
      );

      // If the item exists in the cart, update its quantity
      if (existingItemIndex > -1) {
        const updatedCart = [...currentCart];
        const existingItem = updatedCart[existingItemIndex];
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        return updatedCart;
      }

      // If the item is new or has unique tweaks, add it to the cart
      return [
        ...currentCart,
        {
          ...foodItem,
          quantity: 1,
          tweaks: tweaks,
          id: foodItemIdWithTweaks, // Use the combined ID
        },
      ];
    });
  };

  // Handle escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

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
            <div className="close-btn" onClick={closeModal}>
              {SvgIcons.CloseIcon}
            </div>
            <motion.header
              style={{
                backgroundImage: `url(${imgUrl})`,
              }}
              className="modal-header"
              variants={childVariants}
            ></motion.header>
            <motion.section className="modal-body" variants={childVariants}>
              <div className="modal-body__props">
                {allergen.map((allergen, i) => (
                  <div key={i}>{renderFoodAllergenIcon(allergen)}</div>
                ))}
              </div>
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
              <AnimatePresence>
                {showNotification && (
                  <motion.span
                    className="notification"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.1 },
                    }}
                    exit={{ x: 200, opacity: 0, transition: { duration: 0.2 } }}
                  >
                    Your bite is in the cart!
                  </motion.span>
                )}
              </AnimatePresence>
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
