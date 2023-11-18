import CartItem from "./CartItem";

const OrderList = ({ data }: { data: any }) => {
  return (
    <section className="order-item__wrapper">
      {data && data.map((item: any) => <CartItem key={item.id} item={item} />)}
    </section>
  );
};

  export default OrderList;
