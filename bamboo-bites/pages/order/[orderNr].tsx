import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import OrderList from "@/components/OrderList";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

interface OrderDetail {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
  quantity: number;
}

const SingleOrderPage = () => {
  const { setCart } = useContext(AppContext);
  const router = useRouter();
  const { orderNr } = router.query;
  const [orderData, setOrderData] = useState<OrderDetail[]>([]);

  // Fetches order data from API
  const fetchOrderData = async () => {
    const res = await fetch(
      `https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/order/${orderNr}`
    );
    const data = await res.json();

    return data;
  };

  // Fetches order data on mount and sets it to state
  useEffect(() => {
    const fetchOrderData = async () => {
      const res = await fetch(
        `https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/order/${orderNr}`
      );
      const data = await res.json();
      setOrderData(data.order?.order);
    };
    fetchOrderData();
  }, [orderNr]);

  const editOrder = () => {
    // Populates the cart with the order data before redirecting
    setCart(orderData);

    // Redirect and add orderNr to query string
    router.push(`/cart?orderNr=${orderNr}`);
  };

  return (
    <PageWrapper column>
      <PageHeader
        title="Order"
        img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
      />
      <PageColumn title={`Your order: ${orderNr}`}>
        <OrderList data={orderData} />
        <Button title="EDIT ORDER" action={editOrder} />
      </PageColumn>
    </PageWrapper>
  );
};

export default SingleOrderPage;
