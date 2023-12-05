import { useRouter } from "next/router";
import {useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import ContentWrapper from "@/components/ContentWrapper";
import OrderList from "@/components/OrderList";
import Button from "@/components/Button";

interface OrderDetail {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
  quantity: number;
}

const SingleOrderPage = () => {
  const router = useRouter();
  const { orderNr } = router.query;
  const [orderData, setOrderData] = useState<OrderDetail[]>([]);
  const [orderStatus, setOrderStatus] = useState("")
  const [showModal, setShowModal] = useState(false);

  // Fetches order data on mount and sets it to state
  useEffect(() => {
    const fetchOrderData = async () => {
      const res = await fetch(
        `https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/order/${orderNr}`
      );
      const data = await res.json();
      console.log(data.order?.status);
      
      setOrderData(data.order?.order);
      setOrderStatus(data.order?.status)
    };
    fetchOrderData();
  }, [orderNr]);

  useEffect(() => {
    console.log(orderData);
    console.log(orderStatus);
    
  }, []);

  const cancelOrder = async () => {
    const headers = {
      "Content-Type": "application/json",
      ...(typeof orderNr === "string" && { orderNr }),
    };
    const response = await fetch(
      `https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/cancelOrder/${orderNr}`,
      {
        method: "DELETE",
        headers: headers,
      }
    );
    const data = await response.json();
    console.log(data);

    //Show modal
    setShowModal(true);
    //Hide modal after 5 seconds and then redirect to home page.
    setTimeout(() => {
      setShowModal(false);
      router.push(`/`);
    }, 5000);
  };

  return (
    <PageWrapper column>
      <PageHeader
        title="Order"
        img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png" //!!Change url !!!
      />
      <PageColumn title={`Your order ${orderNr}`}>
        <section className="status">
          <h3>Order status</h3>
          <h3>{orderStatus}</h3>
        </section>
        <section className="status-img">
          <img src="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/ramen_white+1.png" alt="" />
          
          {
            orderStatus === "pending" ? (<>
            <h3>Your order is being processed</h3><p>Sit back, relax and enjoy our atmosphere</p></>): orderStatus === "cooking" ? (<>
            <h3>Your order is being cooked</h3><p>Sit back and relax, your food will be done shortly</p></>) : (<>
            <h3>Your order is done!</h3><p>Enjoy your food!</p></>)
          }
        </section>
          <ContentWrapper title="">
            <OrderList data={orderData} />
          </ContentWrapper>

        {
          orderStatus === "pending" ? (<Button title="CANCEL ORDER" action={cancelOrder}></Button>) : (<></>)
        }
      </PageColumn>
  
      {/*Modal*/}
      {showModal && (
        <div className="modal">
          <h3 style={{ color: "white" }}>
            Order <span style={{ color: "#ff4e4e" }}>{orderNr}</span> has been
            cancelled!
          </h3>
        </div>
      )}
    </PageWrapper>
  );
};

export default SingleOrderPage;
