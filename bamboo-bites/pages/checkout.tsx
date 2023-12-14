import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import ContentWrapper from "@/components/ContentWrapper";
import OrderList from "@/components/OrderList";
import Addons from "@/components/Addons";
import DeliveryMethod from "@/components/DeliveryMethod";
import TotalPrice from "@/components/TotalPrice";
import Button from "@/components/Button";
import AppContext from "@/context/AppContext";

const Checkout = () => {
  const router = useRouter();
  const { cart } = useContext(AppContext);
  const [extras, setExtras] = useState([]);

  const API_URL =
    "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/extras";
  const imgURL =
    "https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/checkout_desktop_720x1024.png";

  // Fetches extras data on mount and sets it to state
  useEffect(() => {
    async function fetchExtras() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setExtras(data.extras);
      } catch (error) {
        console.error(error, "Failed to fetch menu items");
      }
    }
    fetchExtras();
  }, []);

  const toPayment = async () => {
    router.push(`/payment`);
  };

  return (
    <PageWrapper column>
      <PageHeader title="Checkout" img={imgURL} />
      <PageColumn title="Your Order Awaits!">
        <ContentWrapper title="Order items">
          <OrderList data={cart} editable />
          <TotalPrice />
        </ContentWrapper>

        <ContentWrapper title="Add a side dish">
          <Addons data={extras} />
        </ContentWrapper>

        <ContentWrapper title="Delivery method">
          <DeliveryMethod />
        </ContentWrapper>

        <Button action={toPayment} title="READY TO PAY" />
      </PageColumn>
    </PageWrapper>
  );
};

export default Checkout;
