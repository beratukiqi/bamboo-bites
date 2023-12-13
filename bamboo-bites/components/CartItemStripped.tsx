import { OrderItemProps } from "@/interfaces";

const CartItemStripped = ({ item }: OrderItemProps) => {
  return (
    <>
      <article className="order-item--stripped">
        <h2 className="order-item__title">{item.item}</h2>

        <span className="order-item__quantity">QTY: {item.quantity}</span>
        <span className="order-item__price">
          <b>$</b>
          {item.price}
        </span>
      </article>
      {(item.tweaks?.protein || item.tweaks?.allergens) && (
        <ul className="order-item__tweaks">
          {item.tweaks?.protein && (
            <li className="order-item__tweaks--protein">
              {item.tweaks?.protein}
            </li>
          )}

          {item.tweaks?.allergens &&
            Object.entries(item.tweaks.allergens).map(([key, value]) => (
              <li
                key={key}
                className={`order-item__tweaks--allergen ${
                  value ? "--active" : ""
                }`}
              >
                {key}
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default CartItemStripped;
