import { ButtonProps } from "@/interfaces";
import { motion } from "framer-motion";

const Button = ({ title, action, disabled }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ backgroundColor: "#FFFFFF", color: "black" }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      disabled={disabled}
      className="primary-button"
      onClick={() => action()}
    >
      {title}
    </motion.button>
  );
};

export default Button;
