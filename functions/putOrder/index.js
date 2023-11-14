import { sendResponse } from "../../responses/index";
import { docClient } from "../../services/client";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

exports.handler = async (event) => {
  const order = JSON.parse(event.body); // [{},{}]

  let currentOrderNr;
  if (event.headers.orderNr) {
    try {
      currentOrderNr = JSON.parse(event.headers.orderNr);
    } catch (error) {
      // Handle the error if the JSON parsing fails
      console.error("Error parsing orderNr:", error);
      // Optionally set currentOrderNr to undefined or handle it accordingly
      currentOrderNr = undefined;
    }
  }
  const min = 10000000; // Minimum 8-digit number
  const max = 99999999; // Maximum 8-digit number

  const generateOrderNumber = () => {
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
      message: "Could not add order",
    });
  }
};
