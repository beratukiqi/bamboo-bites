import OrderTable from "@/components/OrderTable";
import { useEffect, useState } from "react";

interface Order {
  orderNr: number;
  timeStamp: string;
  status: string;
}

const Orders = () => {
    const today = new Date();
    const todaysDate = today.toISOString().split("T")[0] + "T00:00:00";
    // const todaysDate = "2023-11-23T00:00:00"
    const statusList = ["pending", "cooking", "ready for pickup", "ready for delivery", "picked up", "delivered"];

    const [ordersByStatus, setOrdersByStatus] = useState<{ [status: string]: Order[] }>({});

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

    return (
    <>
        {statusList.map((status) => (
        <OrderTable key={status} orders={ordersByStatus[status] || []} />
        ))}
    </>
    );
};

export default Orders;