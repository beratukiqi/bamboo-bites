import { useRouter } from "next/router";
import { useContext } from "react";
import ContentWrapper from "@/components/ContentWrapper";
import PageWrapper from "@/components/PageWrapper";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import OrderList from "@/components/OrderList";
import TotalPrice from "@/components/TotalPrice";
import PaymentMethod from "@/components/PaymentMethod";
import Button from "@/components/Button";
import AppContext from "@/context/AppContext";

const Payment = () => {
  const router = useRouter();
  const { orderNr } = router.query;
  const { cart, setCart, orderDetails } = useContext(AppContext);

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
        img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png" //!!Change img url!!
      />
      <PageColumn title="Payment options">
        <ContentWrapper title="Your order">
          <OrderList data={cart} stripped={true} />
          <TotalPrice />
        </ContentWrapper>
        <ContentWrapper title="Available payment methods">
          <PaymentMethod />
        </ContentWrapper>

        <Button action={sendOrder} title="PAY FOR ORDER" />
      </PageColumn>
    </PageWrapper>
  );
};

export default Payment;
