import { useContext, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { SvgIcons } from "./SvgIcons";
import AppContext from "@/context/AppContext";

interface MenuItemProps {
	food: {
		id: string;
		item: string;
		price: number;
		desc: string;
		imgUrl: string;
		protein: [];
		tweaks?: string[];
	};
}

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
				className="menu-item-mobile__container"
				style={{
					backgroundImage: `url(${imgUrl})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				<section className="menu-item-mobile__info">
					<header className="menu-item-mobile__text">
						<h2 className="h2-menu-item-mobile">{item}</h2>
					</header>
					<span className="menu-item-mobile__price">
						<b>$</b>
						{price}
					</span>
					<button onClick={handleAddItem} className="menu-item-mobile__addBtn">
						{SvgIcons.AddIcon}
					</button>
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
