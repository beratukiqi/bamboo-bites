import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import TotalPrice from "@/components/TotalPrice";
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

  const toCheckout = async () => { //Varför async?
    // Do not add orderNr if it is undefined
    router.push(orderNr ? `/checkout?orderNr=${orderNr}` : `/checkout`);
  };
  const toMenu = () => {
    router.push(`/menu`);
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
        <PageColumn title={cart.length === 0 ? "Your cart is empty" : "Your cart"}>
          <section className="order-item__wrapper">
            {cart && cart.map((item) => <CartItem key={item.id} item={item} />)}
          </section>
          <button disabled={cart.length === 0} onClick={toCheckout}>
            Go to checkout
          </button>
          <button onClick={toMenu}> Menu</button>
          <TotalPrice />
        </PageColumn>
      </PageWrapper>
    </main>
  );
};

export default Cart;
