import CartItem from "./CartItem";
import CartItemStripped from "./CartItemStripped";

const OrderList = ({
  data,
  admin,
  editable,
  stripped,
}: {
  data: any;
  admin?: boolean;
  editable?: boolean;
  stripped?: boolean;
}) => {
  return !admin ? (
    <section className={`order-item__wrapper${stripped ? "--stripped" : ""}`}>
      {data &&
        data.map((item: any, i: number) => {
          const key = item.id + i;
          return stripped ? (
            <CartItemStripped key={key} item={item} />
          ) : (
            <CartItem key={key} item={item} editable={editable} />
          );
        })}
    </section>
  ) : (
    <section className="order-item__wrapper">
      {data &&
        data.order.map((item: any, i: number) => (
          <CartItem key={item.id + i} item={item} editable={editable} />
        ))}
    </section>
  );
};

export default OrderList;
