import CartItem from "./CartItem";

const OrderList = ({ data }: { data: any }) => {
  return (
    data && data.map((item: any) => <CartItem key={item.id} item={item} />)
  );
};

export default OrderList;
