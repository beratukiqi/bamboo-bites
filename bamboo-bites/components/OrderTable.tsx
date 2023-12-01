import OrderItemAdmin from "./OrderItemAdmin";

interface OrderTableProps {
  orders: OrderItem[];
  status: string;
  activeOrder: OrderItem | null;
  openModal: (order: OrderItem) => void;
  closeModal: () => void;
}

interface OrderItem {
  orderNr: number;
  timeStamp: string;
  status: string;
}

const OrderTable = ({
  orders,
  status,
  activeOrder,
  openModal,
  closeModal,
}: OrderTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="table-header">{status}</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((order) => (
            <OrderItemAdmin
              key={order.orderNr}
              order={order}
              isOpen={activeOrder === order}
              openModal={() => openModal(order)}
              closeModal={closeModal}
            />
          ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
