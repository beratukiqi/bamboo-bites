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

  const { orderNr } = router.query;

  const toCheckout = async () => {
    // Do not add orderNr if it is undefined
    router.push(orderNr ? `/checkout?orderNr=${orderNr}` : `/checkout`);
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
          <button onClick={toCheckout} style={{ padding: "2rem" }}>
            GO TO CHECKOUT
          </button>
        </PageColumn>
      </PageWrapper>
    </main>
  );
};

export default Cart;
