import { QtyButtonProps } from "@/interfaces";
import { motion } from "framer-motion";

const QtyButton = ({ title, action, disabled }: QtyButtonProps) => {
  return (
    <motion.button
      whileHover={{
        backgroundColor: "#ff4e4e",
        color: "black",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0 }}
      disabled={disabled}
      className="qty-button"
      onClick={action}
    >
      {title}
    </motion.button>
  );
};

export default QtyButton;
