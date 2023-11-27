import Button from "@/components/Button";
import OrderList from "@/components/OrderList";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import ContactInfo from "@/components/helpers/ContactInfo";
import { useEffect, useState } from "react";

interface OrderDetail {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
  quantity: number;
  orderNr: number;
}

interface Order {
  order: OrderDetail[];
  orderNr: string;
  status: string;
  timeStamp: string;
  totalPrice: number;
}

const Admin = () => {
  const [orderData, setOrderData] = useState<Order>({
    order: [],
    orderNr: "",
    status: "",
    timeStamp: "",
    totalPrice: 0,
  });

  // Fetches order data on mount and sets it to state
  useEffect(() => {
    const fetchOrderData = async () => {
      const res = await fetch(
        `https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/order/36771411`
      );
      const data = await res.json();
      console.log(data);
      setOrderData(data.order);
    };
    fetchOrderData();
  }, []);

  const changeStatus = async (status: string) => {
    const response = await fetch(
      `https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/updateOrderStatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNr: orderData.orderNr,
          status: status,
        }),
      }
    );
    const data = await response.json();
    console.log("RESPONSE HERE", data);
    setOrderData(data.order);
  };

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);
  return (
    <PageWrapper id="contact" column>
      <PageHeader
        title="Admin"
        img="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/contact_desktop_720x1024.png"
      />
      <PageColumn title="">
        <OrderList data={orderData} admin />
        <Button
          title="CHANGE TO COOKING"
          action={() => changeStatus("cooking")}
        />
      </PageColumn>
    </PageWrapper>
  );
};

export default Admin;
