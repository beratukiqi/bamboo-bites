import CartItem from "@/components/CartItem";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { useState, useEffect } from "react";

interface OrderDetail {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
  quantity: number;
}

interface OrderItem {
  order: OrderDetail;
}

const Order = () => {
  const [orderData, setOrderData] = useState<OrderItem[]>([]);

  const fetchOrderData = async () => {
    const res = await fetch(
      "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/orders"
    );
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const allOrders = fetchOrderData();

    allOrders.then((data) => {
      setOrderData(data.orders);
    });
  }, []);

  useEffect(() => {
    console.log("ORDER DATA", orderData);
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
              orderData.map((item: any) => (
                <CartItem key={item.order.id} item={item.order} />
              ))}
          </section>
        </PageColumn>
      </PageWrapper>
    </main>
  );
};

export default Order;
