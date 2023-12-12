import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses/index";
import { generateTimestamp } from "./generateTimeStamp";
import { generateOrderNumber } from "./generateOrderNumber";
import { calculateTotalPrice } from "./calculateTotalPrice";

const parseHeaderValue = (header, defaultValue) => {
  try {
    return JSON.parse(header);
  } catch (error) {
    console.error(`Error parsing ${defaultValue}:`, error);
    return undefined;
  }
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

  const totalPrice = calculateTotalPrice(order);
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
        deliveryMethod: deliveryMethod,
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
