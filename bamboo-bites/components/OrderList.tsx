import CartItem from "./CartItem";

const OrderList = ({
  data,
  admin,
  editable,
}: {
  data: any;
  admin?: boolean;
  editable?: boolean;
}) => {
  return !admin ? (
    <section className="order-item__wrapper">
      {data &&
        data.map((item: any, i: number) => (
          <CartItem key={item.id + i} item={item} editable={editable} />
        ))}
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
