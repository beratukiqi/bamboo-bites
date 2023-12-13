import { AnimatePresence, motion } from "framer-motion";

const PageColumn = ({
  children,
  title,
  className,
  id,
}: {
  children: any;
  title?: string;
  className?: string;
  id?: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        key={382198321}
        id={id ? id : ""}
        className={`hero column ${className ? className : ""}`}
      >
        {title && <h2 className="column__title">{title}</h2>}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageColumn;
