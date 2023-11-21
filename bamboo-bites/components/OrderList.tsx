import CartItem from "./CartItem";

const OrderList = ({ data }: { data: any }) => {
  return (
    <section className="order-item__wrapper">
      {data &&
        data.map((item: any, i: number) => (
          <CartItem key={item.id + i} item={item} />
        ))}
    </section>
  );
};

export default OrderList;
