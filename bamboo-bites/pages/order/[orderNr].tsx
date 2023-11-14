import CartItem from "@/components/CartItem";
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

function singleOrderPage() {
  const { setCart } = useContext(AppContext);
  const [orderData, setOrderData] = useState<OrderDetail[]>([]); // [1]
  const [timeLeft, setTimeLeft] = useState(65); // [2]
  const TIME_LIMIT = 60; // [3]
  const router = useRouter();
  const { orderNr } = router.query;

  const fetchOrderData = async () => {
    const res = await fetch(
      `https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/order/${orderNr}`
    );
    const data = await res.json();

    console.log("DATA FETCHED", data);
    return data;
  };

  useEffect(() => {
    const orderData = fetchOrderData();

    orderData.then((data) => {
      setOrderData(data.order?.order);
    });
  }, [orderNr]);

  useEffect(() => {
    console.log("ORDER DATA", orderData);
  }, [orderData, orderNr]);

  const editOrder = () => {
    setCart(orderData);

    // Add orderNr to the url query
    router.push(`/cart?orderNr=${orderNr}`);
    // router.push(`/cart`);
  };

  return (
    <main>
      <PageWrapper column>
        <PageHeader
          title="Order"
          img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
        />
        <PageColumn title={`Your order: ${orderNr}`}>
          {orderData &&
            orderData.map((item) => <CartItem key={item.id} item={item} />)}

          <button
            onClick={editOrder}
            style={{
              padding: "2rem",
            }}
            disabled={timeLeft < TIME_LIMIT}
          >
            EDIT ORDER
          </button>
        </PageColumn>
      </PageWrapper>
    </main>
  );
}

export default singleOrderPage;
