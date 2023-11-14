import CartItem from "@/components/CartItem";
import ContentWrapper from "@/components/ContentWrapper";
import DeliveryMethod from "@/components/DeliveryMethod";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import PaymentMethod from "@/components/PaymentMethod";
import AppContext from "@/context/AppContext";
import router, { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Checkout = () => {
  const { cart, setCart } = useContext(AppContext);
  const router = useRouter();
  const { orderNr } = router.query;

  const sendOrder = async () => {
    console.log("ORDER NR PRE FETCH", orderNr);

    const headers = {
      "Content-Type": "application/json",
      ...(typeof orderNr === "string" && { orderNr }),
    };

    const res = await fetch(
      "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/putOrder",
      {
        method: "POST",
        body: JSON.stringify(cart),
        headers: headers,
      }
    );

    const data = await res.json();
    console.log("DATA/RES", data);
    console.log("SENT ORDER", cart);

    setCart([]);

    router.push(`/order/${data.orderNr}`);
  };

  return (
    <main>
      <PageWrapper column>
        <PageHeader
          title="Checkout"
          img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
        />

        <PageColumn title="Please review your order and make a payment!">
          <ContentWrapper title="Order items">
            <section className="order-item__wrapper">
              {cart &&
                cart.map((item) => <CartItem key={item.id} item={item} />)}
            </section>
          </ContentWrapper>

          <ContentWrapper title="Delivery method">
            <DeliveryMethod />
          </ContentWrapper>
          <ContentWrapper title="Payment method">
            <PaymentMethod />
          </ContentWrapper>
          <button onClick={sendOrder} style={{ padding: "2rem" }}>
            SEND ORDER
          </button>
        </PageColumn>
      </PageWrapper>
    </main>
  );
};

export default Checkout;
