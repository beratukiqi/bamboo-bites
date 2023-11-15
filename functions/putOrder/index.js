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

  const generateOrderNumber = () => {
    const min = 10000000; // Minimum 8-digit number
    const max = 99999999; // Maximum 8-digit number

    const orderNr = Math.floor(min + Math.random() * max);

    return orderNr;
  };

  const orderNr = currentOrderNr
    ? parseInt(currentOrderNr)
    : generateOrderNumber();

  try {
    const command = new PutCommand({
      TableName: "bambooBites-orders",
      Item: {
        orderNr: orderNr,
        order: order,
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
