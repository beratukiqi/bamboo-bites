import CartItem from "@/components/CartItem";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const { cart } = useContext(AppContext);
  const router = useRouter();

  const sendOrder = async () => {
    const res = await fetch(
      "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/putOrder",
      {
        method: "POST",
        body: JSON.stringify(cart),
      }
    );

    const data = await res.json();
    console.log("DATA/RES", data);
    console.log("SENT ORDER", cart);

    router.push(`/order/${data.orderNr}`);
  };

  useEffect(() => {
    console.log("CART", cart);
  }, [cart]);

  return (
    <main>
      <PageWrapper column>
        <PageHeader
          title="Cart"
          img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
        />
        <PageColumn title="Your cart">
          <section className="order-item__wrapper">
            {cart && cart.map((item) => <CartItem key={item.id} item={item} />)}
          </section>
          <button onClick={sendOrder} style={{ padding: "2rem" }}>
            SEND ORDER
          </button>
        </PageColumn>
      </PageWrapper>
    </main>
  );
};

export default Cart;
