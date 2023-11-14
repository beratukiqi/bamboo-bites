import CartItem from "@/components/CartItem";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface OrderDetail {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
  quantity: number;
}

function singleOrderPage() {
  const [orderData, setOrderData] = useState<OrderDetail[]>([]); // [1
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
        </PageColumn>
      </PageWrapper>
    </main>
  );
}

export default singleOrderPage;
