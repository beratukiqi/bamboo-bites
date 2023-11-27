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

    const styleStatus = (status: string) => {
        console.log("style", status);
        
        switch (status) {
            case 'pending':
                return 'pending-status';
            case 'cooking':
                return 'cooking-status'; 
            case 'pick-up':
                return 'pickUp-status'; 
            case 'delivery':
                return 'delivery-status';
            case 'picked-up':
                return 'pickUp-status'; 
            case 'delivered':
                return 'delivery-status';      
            default:
                return ''; 
        }
    };
    

    return (
        <table>
            <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders && orders.map((order) => (
                    <tr key={order.orderNr}>
                        <td>{order.orderNr}</td>
                        <td>{order.timeStamp}</td>
                        <td className={styleStatus(order.status)}>{order.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Orders;