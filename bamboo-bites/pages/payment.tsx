import Button from "@/components/Button";
import OrderList from "@/components/OrderList";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import PaymentInput from "@/components/PaymentInput";
import PaymentMethod from "@/components/PaymentMethod";
import TotalPrice from "@/components/TotalPrice";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/router";
import { useContext } from "react";

const Payment = () => {
  const { cart, setCart, orderDetails } = useContext(AppContext);
  const router = useRouter();

  const { orderNr } = router.query;

  const sendOrder = async () => {
    // If an orderNr exists, it will be added to the headers.
    // orderNr in Headers will determine if the order is new or an update.
    const headers = {
      "Content-Type": "application/json",
      ...(typeof orderNr === "string" && { orderNr }),
      ...(orderDetails && {
        "X-Order-Delivery-Method": orderDetails.deliveryMethod,
      }),
      ...(orderDetails && { "X-Order-Status": orderDetails.status }),
    };

    // Sends a POST request to the API with the cart data
    const res = await fetch(
      "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/putOrder",
      {
        method: "POST",
        body: JSON.stringify(cart),
        headers: headers,
      }
    );
    const data = await res.json(); // We get the orderNr back from the API
    setCart([]); // Clears the cart

    // Redirects to the order page with the new/existing orderNr
    router.push(`/order/${data.orderNr}`);
  };

  return (
    <PageWrapper column>
      <PageHeader
        title="Payment"
        img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
      />
      <PageColumn>
        <OrderList data={cart} />
        <TotalPrice />

        <PaymentMethod />
        <Button action={sendOrder} title="PAY FOR ORDER" />
      </PageColumn>
    </PageWrapper>
  );
};

export default Payment;