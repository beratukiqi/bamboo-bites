import Button from "@/components/Button";
import OrderList from "@/components/OrderList";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import TotalPrice from "@/components/TotalPrice";
import AppContext from "@/context/AppContext";
import PageWrapper from "@/components/PageWrapper";
import ContentWrapper from "@/components/ContentWrapper";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Cart = () => {
  const { cart } = useContext(AppContext);
  const router = useRouter();
  const { orderNr } = router.query;

  const toCheckout = () => {
    // Adds orderNr to url if it already exists
    router.push(orderNr ? `/checkout?orderNr=${orderNr}` : `/checkout`);
  };
  const toMenu = () => {
    router.push(`/menu`);
  };

  useEffect(() => {
    console.log("Cart", cart);
  }, [cart]);

  return (
    <PageWrapper column>
      <PageHeader
        title="Cart"
        img="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/cart_desktop_720x1024.png"
      />
      <PageColumn
        title={cart.length === 0 ? "Your cart is empty" : "Your cart"}
      >
        <ContentWrapper title="Cart items">
          <OrderList data={cart} editable />
        </ContentWrapper>
        <Button
          title="Go to Checkout"
          action={toCheckout}
          disabled={cart.length === 0}
        />
        <Button title="Menu" action={toMenu} />
        <ContentWrapper title="Total price">
          <TotalPrice />
        </ContentWrapper>
      </PageColumn>
    </PageWrapper>
  );
};

export default Cart;
