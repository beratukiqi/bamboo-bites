import { useContext } from "react";
import { SvgIcons } from "./SvgIcons";
import AppContext from "@/context/AppContext";

interface ExtrasProps {
	id: string;
	item: string;
	price: number;
}

const Addons = ({ data }: ExtrasProps) => {
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
	return (
		<div className="extras-container__wrapper">
			{data &&
				data.map((item: any, i: number) => (
					<article className="extras-container">
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
							<button onClick={() => addToCart(item)}>
								{SvgIcons.AddIcon}
							</button>
						</section>
					</article>
				))}
		</div>
	);
};

export default Addons;
