import OrderTable from "@/components/OrderTable";
import PageWrapper from "@/components/PageWrapper";
import { useEffect, useState } from "react";

interface Order {
  orderNr: number;
  timeStamp: string;
  status: string;
}

const Orders = () => {
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0] + "T00:00:00";

  const statusList = [
    "pending",
    "cooking",
    "eat in",
    "take away",
    "done",
  ];

  const [ordersByStatus, setOrdersByStatus] = useState<{
    [status: string]: Order[];
  }>({});

  const fetchOrdersByStatus = async (status: string) => {
    try {
      const response = await fetch(
        `https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/filterOrders/${status}?timeStamp=${todaysDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(status, data.filteredOrders);

      setOrdersByStatus((prevOrders) => ({
        ...prevOrders,
        [status]: data.filteredOrders,
      }));
    } catch (error) {
      console.error(error, `Failed to fetch ${status} orders`);
    }
  };

  useEffect(() => {
    statusList.forEach((status) => fetchOrdersByStatus(status));
  }, []);

  useEffect(() => {
    console.log(ordersByStatus);
  }, [ordersByStatus]);

  const [activeOrder, setActiveOrder] = useState(null);

  const openModal = (order: any) => {
    setActiveOrder(order);
  };

  const closeModal = () => {
    setActiveOrder(null);
  };

  return (
    <PageWrapper id="admin">
      <section className="table-wrapper">
        {statusList.map((status) => (
          <OrderTable
            activeOrder={activeOrder}
            closeModal={closeModal}
            openModal={openModal}
            key={status}
            status={status}
            orders={ordersByStatus[status] || []}
          />
        ))}
      </section>
      <section className="berattest"></section>
    </PageWrapper>
  );
};

export default Orders;
