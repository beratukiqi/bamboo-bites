import OrderTable from "@/components/OrderTable"
import { useEffect, useState } from "react"

interface Order {
    orderNr: number,
    timeStamp: string,
    status: string,
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch("https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/orders")
                const data = await response.json();
                setOrders(data.orders)
            } catch (error) {
                console.error(error, "Failed to fetch orders");
            }
        }
        fetchOrders()
    }, [])

    useEffect(() => {
        console.log(orders);
    }, [orders] )    

    return (
        <OrderTable orders={orders}/>
    )
}

export default Orders;