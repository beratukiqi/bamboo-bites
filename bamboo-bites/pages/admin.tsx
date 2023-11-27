import Button from "@/components/Button";
import OrderList from "@/components/OrderList";
import OrderModal from "@/components/OrderModal";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
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
  deliveryMethod: string;
}

const Orders = () => {
  const [ordersData, setOrdersData] = useState<Order[]>();

  // Fetches order data on mount and sets it to state
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await fetch(
          `https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/orders`
        );
        const data = await res.json();
        console.log(data.orders);

        // Update state after data is fetched
        setOrdersData(data.orders);
      } catch (error) {
        console.error("Error fetching order data:", error);
        // Handle error case
      }
    };

    fetchOrderData();
  }, []);

  const [chosenOrder, setChosenOrder] = useState<Order>();

  return (
    <PageWrapper id="contact" column>
      <PageHeader
        title="Admin"
        img="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/contact_desktop_720x1024.png"
      />
      <PageColumn title="">
        {ordersData ? (
          ordersData.map((order: Order, i: number) => (
            <>
              <p onClick={() => setChosenOrder(order)} key={i}>
                {order.orderNr}
              </p>
            </>
          ))
        ) : (
          <p>No orders found</p>
        )}
        {chosenOrder && <OrderModal orderItem={chosenOrder} />}
      </PageColumn>
    </PageWrapper>
  );
};

export default Orders;
