import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { useRouter } from "next/router";

function singleOrderPage() {
  const router = useRouter();
  const { orderNr } = router.query;

  const fetchOrderData = async () => {
    const res = await fetch(
      "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/getorder"
    );
    const data = await res.json();

    return data;
  };
  return (
    <main>
      <PageWrapper column>
        <PageHeader
          title="Order"
          img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
        />
        <PageColumn title={`Your order: ${orderNr}`}>
          <h2>HEHEH</h2>
        </PageColumn>
      </PageWrapper>
    </main>
  );
}

export default singleOrderPage;
