import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses/index";

const parseHeaderValue = (header, defaultValue) => {
  try {
    return JSON.parse(header);
  } catch (error) {
    console.error(`Error parsing ${defaultValue}:`, error);
    return undefined;
  }
};

const calculateTotalPrice = (order, deliveryMethod) => {
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

  return Math.floor(min + Math.random() * max);
};

const generateTimestamp = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

exports.handler = async (event) => {
  const order = JSON.parse(event.body);

  if (!order || !Array.isArray(order) || order.length === 0) {
    return sendResponse(400, {
      success: false,
      message: "Order is required and should not be an empty list.",
    });
  }

  const currentOrderNr = parseHeaderValue(event.headers.ordernr, "orderNr");
  const deliveryMethod = event.headers["x-order-delivery-method"] || undefined;
  const status = event.headers["x-order-status"] || undefined;

  const totalPrice = calculateTotalPrice(order, deliveryMethod);
  const timeStamp = generateTimestamp();

  const orderNr = currentOrderNr || generateOrderNumber();

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
      orderNr,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to add order",
    });
  }
};
