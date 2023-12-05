import OrderTable from "@/components/OrderTable";
import PageWrapper from "@/components/PageWrapper";
import { useEffect, useState } from "react";
import {SvgIcons} from "../components/SvgIcons"

const navItems = [
	{
		name: "Orders",
    icon: SvgIcons.OrdersIcon
	},
	{
		name: "Statistics",
    icon: SvgIcons.StatIcon
	},
	{
		name: "Time reports",
    icon: SvgIcons.TimeReportIcon
	},
	{
		name: "Settings",
    icon: SvgIcons.SettingsIcon
	},
];

interface Order {
  orderNr: number;
  timeStamp: string;
  status: string;
}

const Admin = () => {
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
      <aside>
        <nav className="admin-nav">
          {SvgIcons.LogoIcon}
          <ul className = "admin-nav__links">
            {navItems.map((item) => (
              <article key={item.name} className="admin-nav__items">
                {item.icon}
                <li>{item.name}</li>
              </article>
            ))}
          </ul>
        </nav>
      </aside>
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

export default Admin;



// import Button from "@/components/Button";
// import OrderList from "@/components/OrderList";
// import OrderModal from "@/components/OrderModal";
// import PageColumn from "@/components/PageColumn";
// import PageHeader from "@/components/PageHeader";
// import PageWrapper from "@/components/PageWrapper";
// import { useEffect, useState } from "react";

// interface OrderDetail {
//   id: string;
//   item: string;
//   price: number;
//   desc: string;
//   imgUrl: string;
//   quantity: number;
//   orderNr: number;
// }

// interface Order {
//   order: OrderDetail[];
//   orderNr: string;
//   status: string;
//   timeStamp: string;
//   totalPrice: number;
//   deliveryMethod: string;
// }

// const Orders = () => {
//   const [ordersData, setOrdersData] = useState<Order[]>();

//   // Fetches order data on mount and sets it to state
//   useEffect(() => {
//     const fetchOrderData = async () => {
//       try {
//         const res = await fetch(
//           `https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/orders`
//         );
//         const data = await res.json();
//         console.log(data.orders);

//         // Update state after data is fetched
//         setOrdersData(data.orders);
//       } catch (error) {
//         console.error("Error fetching order data:", error);
//         // Handle error case
//       }
//     };

//     fetchOrderData();
//   }, []);

//   const [chosenOrder, setChosenOrder] = useState<Order>();

//   return (
//     <PageWrapper id="contact" column>
//       <PageHeader
//         title="Admin"
//         img="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/contact_desktop_720x1024.png"
//       />
//       <PageColumn title="">
//         {ordersData ? (
//           ordersData.map((order: Order, i: number) => (
//             <>
//               <p onClick={() => setChosenOrder(order)} key={i}>
//                 {order.orderNr}
//               </p>
//             </>
//           ))
//         ) : (
//           <p>No orders found</p>
//         )}
//         {chosenOrder && <OrderModal orderItem={chosenOrder} />}
//       </PageColumn>
//     </PageWrapper>
//   );
// };

// export default Orders;
