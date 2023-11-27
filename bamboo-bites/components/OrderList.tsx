import CartItem from "./CartItem";

const OrderList = ({ data, admin }: { data: any; admin?: boolean }) => {
  return !admin ? (
    <section className="order-item__wrapper">
      {data &&
        data.map((item: any, i: number) => (
          <CartItem key={item.id + i} item={item} />
        ))}
    </section>
  ) : (
    <section className="order-item__wrapper">
      {data &&
        data.order.map((item: any, i: number) => (
          <CartItem key={item.id + i} item={item} />
        ))}

      {data.status && <p>{data.status}</p>}
    </section>
  );
};

export default OrderList;
