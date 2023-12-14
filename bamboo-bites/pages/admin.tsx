import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import OrderTable from "@/components/OrderTable";
import { SvgIcons } from "../components/SvgIcons";

const navItems = [
  {
    name: "Orders",
    icon: SvgIcons.OrdersIcon,
    path: "/admin",
  },
  {
    name: "Statistics",
    icon: SvgIcons.StatIcon,
    path: "#",
  },
  {
    name: "Time reports",
    icon: SvgIcons.TimeReportIcon,
    path: "#",
  },
  {
    name: "Settings",
    icon: SvgIcons.SettingsIcon,
    path: "#",
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

  const statusList = ["pending", "cooking", "ready", "completed"];

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

  const [activeOrder, setActiveOrder] = useState(null);

  const openModal = (order: any) => {
    setActiveOrder(order);
  };

  const closeModal = () => {
    setActiveOrder(null);
  };
  const router = useRouter();
  const path = router.pathname;

  const handleActivePath = (path: string, itemName: string) => {
    if (path === "/admin" && itemName.toLowerCase() === "orders") {
      return "active";
    }

    let currPath = path.replace("/admin", "");
    if (currPath === itemName.toLowerCase()) {
      return "active";
    }

    return "";
  };

  return (
    <PageWrapper id="admin">
      <aside>
        <nav className="admin-nav">
          {SvgIcons.LogoIcon}
          <ul className="admin-nav__links">
            {navItems.map((item) => (
              <article key={item.name} className="admin-nav__items">
                {item.icon}
                <li className="admin-nav__path">
                  <Link
                    href={item.path}
                    className={handleActivePath(path, item.name)}
                  >
                    {item.name}
                  </Link>
                </li>
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
      <section className="modal-target-container"></section>
    </PageWrapper>
  );
};

export default Admin;
