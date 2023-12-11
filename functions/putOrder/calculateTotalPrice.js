export const calculateTotalPrice = (order) => {
  let price = 0;
  order.forEach((item) => {
    price += item.price * item.quantity;
  });

  return price;
};
