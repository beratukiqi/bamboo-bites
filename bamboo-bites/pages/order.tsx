import OrderItem from "@/components/OrderItem";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { useState, useEffect } from "react";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
const fakeOrderData = [
  {
    id: 1,
    title: "Noodles ",
    price: 10.99,
    image: "https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png",
    quantity: 1,
  },
  {
    id: 2,
    title: "Fun Bowl",
    price: 10.99,
    image: "https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png",
    quantity: 1,
  },
  {
    id: 3,
    title: "Noodle dwas",
    price: 10.99,
    image: "https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png",
    quantity: 1,
  },
];

const Order = () => {
  const [orderData, setOrderData] = useState<OrderItem[]>([]);
  useEffect(() => {
    setOrderData(fakeOrderData);
  }, []);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  return (
    <main>
      <PageWrapper column>
        <PageHeader
          title="Order"
          img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
        />
        <PageColumn title="Order no: 07483210">
          <section className="order-item__wrapper">
            {orderData &&
              orderData.map((item) => <OrderItem key={item.id} item={item} />)}
          </section>
        </PageColumn>
      </PageWrapper>
    </main>
  );
};

export default Order;
