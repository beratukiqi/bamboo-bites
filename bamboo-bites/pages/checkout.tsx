import Button from "@/components/Button";
import OrderList from "@/components/OrderList";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import TotalPrice from "@/components/TotalPrice";
import AppContext from "@/context/AppContext";
import PageWrapper from "@/components/PageWrapper";
import PaymentMethod from "@/components/PaymentMethod";
import ContentWrapper from "@/components/ContentWrapper";
import DeliveryMethod from "@/components/DeliveryMethod";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const Checkout = () => {
  const { cart, setCart } = useContext(AppContext);
  const router = useRouter();
  const { orderNr } = router.query;

  const sendOrder = async () => {
    // If an orderNr exists, it will be added to the headers.
    // orderNr in Headers will determine if the order is new or an update.    

    const headers = {
      "Content-Type": "application/json",
      ...(typeof orderNr === "string" && { orderNr }),
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
        title="Checkout"
        img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
      />
      <PageColumn title="Please review your order and make a payment!">
        <ContentWrapper title="Order items">
          <OrderList data={cart} />
          <TotalPrice />
        </ContentWrapper>

        <ContentWrapper title="Delivery method">
          <DeliveryMethod />
        </ContentWrapper>

        <ContentWrapper title="Payment method">
          <PaymentMethod />
        </ContentWrapper>

        <Button action={sendOrder} title="SEND ORDER" />
      </PageColumn>
    </PageWrapper>
  );
};

export default Checkout;
