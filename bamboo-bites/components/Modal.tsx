import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  food: {
    item?: string;
    price?: number;
    desc?: string;
    img?: string;
  };
}

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

const Modal = ({ isOpen, closeModal, food }: ModalProps) => {
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
              // style={{ background: `url(${food.img})` }}
              style={{
                backgroundImage: `url(https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png)`,
              }}
              className="modal-header"
              variants={childVariants}
            >
              <h3>{food.item}</h3>
              <button onClick={closeModal}>X</button>
            </motion.header>
            <motion.section className="modal-body" variants={childVariants}>
              <p className="modal-body__desc">{food.desc}</p>
              <h6 className="modal-body__price">
                {food.price}
                <b>$</b>
              </h6>
              <button>Add to cart</button>
            </motion.section>
          </motion.article>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Modal;
