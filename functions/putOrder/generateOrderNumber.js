export const generateOrderNumber = () => {
  const min = 10000000; // Minimum 8-digit number
  const max = 99999999; // Maximum 8-digit number

  return Math.floor(min + Math.random() * max);
};
