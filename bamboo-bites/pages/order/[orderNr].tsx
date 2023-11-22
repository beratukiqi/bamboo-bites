import Button from "@/components/Button";
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
  const [showModal, setShowModal] = useState(false)

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

  useEffect(() => {
    console.log(orderData);
    
  }, [])
  

  const editOrder = () => {
    // Populates the cart with the order data before redirecting
    setCart(orderData);

    // Redirect and add orderNr to query string
    router.push(`/cart?orderNr=${orderNr}`);
  };

  const cancelOrder = async () => {
    const headers = {
      "Content-Type": "application/json",
      ...(typeof orderNr === "string" && { orderNr }),
    };
    const response = await fetch(`https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/cancelOrder/${orderNr}`, 
    {
      method: "DELETE",
      headers: headers,
    })
    const data = await response.json()
    console.log(data);

    //Show modal
    setShowModal(true)
    //Hide modal after 5 seconds and then redirect to home page.
    setTimeout(() => {
      setShowModal(false)
      router.push(`/`); 
    }, 5000)

  }

  return (
    <PageWrapper column>
      <PageHeader
        title="Order"
        img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
      />
      <PageColumn title={`Your order: ${orderNr}`}>
        <OrderList data={orderData} />
        <Button title="EDIT ORDER" action={editOrder} />
        <Button title="CANCEL ORDER" action={cancelOrder}/>
      </PageColumn>

      {/*Modal*/}
      {showModal && (
        <div className="modal">
          <h3 style={{ color: 'white' }}>Order <span style={{ color: '#ff4e4e' }}>{orderNr}</span> has been cancelled!</h3>
        </div>
      )}
    </PageWrapper>
  );
};

export default SingleOrderPage;
