import { useContext, useState } from "react";
import AppContext from "@/context/AppContext";
import Modal from "./Modal";
import { MenuItemProps } from "@/interfaces";
import { SvgIcons } from "./SvgIcons";

const MenuItemMobile = ({ food }: MenuItemProps) => {
	const { id, item, price, imgUrl, desc } = food;
	const [modalOpen, setModalOpen] = useState(false);
	const { cart, setCart } = useContext(AppContext);

	const handleAddItem = (event: any) => {
		event.stopPropagation();
		const itemInCart = cart.find((item) => item.id === id);
		if (itemInCart) {
			setCart(
				cart.map((item) =>
					item.id === id ? { ...item, quantity: item.quantity + 1 } : item
				)
			);
		} else {
			setCart([...cart, { ...food, quantity: 1 }]);
		}
	};

	return (
		<>
			<article
				onClick={() => setModalOpen(true)}
				className="menu-item-mobile-container"
				style={{
					backgroundImage: `url(${imgUrl})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				<section className="menu-item-mobile-container__info">
					<h2>{item}</h2>
					<span>
						<b>$</b>
						{price}
					</span>
					<button onClick={handleAddItem}>{SvgIcons.AddIcon}</button>
				</section>
			</article>
			<Modal
				isOpen={modalOpen}
				closeModal={() => setModalOpen(false)}
				food={food}
			/>
		</>
	);
};

export default MenuItemMobile;
