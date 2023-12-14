import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import ContentWrapper from "@/components/ContentWrapper";
import OrderList from "@/components/OrderList";
import TotalPrice from "@/components/TotalPrice";
import Button from "@/components/Button";
import AppContext from "@/context/AppContext";

const Cart = () => {
  const router = useRouter();
  const { orderNr } = router.query;
  const { cart } = useContext(AppContext);

  const imgURL =
    "https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/cart_desktop_720x1024.png";

  const toCheckout = () => {
    // Adds orderNr to url if it already exists
    router.push(orderNr ? `/checkout?orderNr=${orderNr}` : `/checkout`);
  };

  const toMenu = () => {
    router.push(`/menu`);
  };

  return (
    <PageWrapper id="cart" column>
      <PageHeader title="Cart" img={imgURL} />
      <PageColumn
        title={cart.length === 0 ? "Your cart is empty" : "Your cart"}
      >
        <ContentWrapper title="Cart items">
          <OrderList data={cart} editable />
        </ContentWrapper>
        <TotalPrice />
        <Button
          title="Go to Checkout"
          action={toCheckout}
          disabled={cart.length === 0}
        />
        <Button title="Add more items" action={toMenu} />
      </PageColumn>
    </PageWrapper>
  );
};

export default Cart;
