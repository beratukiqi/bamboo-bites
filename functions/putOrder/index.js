import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses/index";

exports.handler = async (event) => {
  const order = JSON.parse(event.body);

  let currentOrderNr;
  if (event.headers.ordernr) {
    try {
      currentOrderNr = JSON.parse(event.headers.ordernr);
    } catch (error) {
      console.error("Error parsing orderNr:", error);
      currentOrderNr = undefined;
    }
  }

  let deliveryMethod;
  if (event.headers["x-order-delivery-method"]) {
    try {
      deliveryMethod = event.headers["x-order-delivery-method"];
    } catch (error) {
      console.error("Error parsing delivery method:", error);
      deliveryMethod = undefined;
    }
  }

  let status;
  if (event.headers["x-order-status"]) {
    try {
      status = event.headers["x-order-status"];
    } catch (error) {
      console.error("Error parsing order status:", error);
      status = undefined;
    }
  }

  const calcTotalPrice = () => {
    let price = 0;
    order.forEach((item) => {
      price += item.price * item.quantity;
    });

    if (deliveryMethod === "delivery") {
      price += 10;
    }

    return price;
  };

  const generateOrderNumber = () => {
    const min = 10000000; // Minimum 8-digit number
    const max = 99999999; // Maximum 8-digit number

    const orderNr = Math.floor(min + Math.random() * max);

    return orderNr;
  };

  const generateTimestamp = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Månader är nollbaserade, därför +1
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    return timestamp;
  };

  const totalPrice = calcTotalPrice();
  const timeStamp = generateTimestamp();

  const orderNr = currentOrderNr
    ? parseInt(currentOrderNr)
    : generateOrderNumber();

  try {
    const command = new PutCommand({
      TableName: "bamboo-bites-ordersDb",
      Item: {
        orderNr: orderNr,
        timeStamp: timeStamp,
        totalPrice: totalPrice,
        order: order,
        status: status,
      },
    });

    const response = await docClient.send(command);

    return sendResponse(200, {
      success: true,
      message: "A new order has been added",
      orderNr: orderNr,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to add order",
    });
  }
};
