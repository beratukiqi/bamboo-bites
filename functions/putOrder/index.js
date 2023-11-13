import { sendResponse } from "../../responses/index";
import { docClient } from "../../services/client";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

exports.handler = async (event) => {
  const order = JSON.parse(event.body); // [{},{}]

  const min = 10000000; // Minimum 8-digit number
  const max = 99999999; // Maximum 8-digit number

  const generateOrderNumber = () => {
    const orderNr = Math.floor(min + Math.random() * max);

    return orderNr;
  };

  try {
    const command = new PutCommand({
      TableName: "bambooBites-orders",
      Item: {
        orderNr: generateOrderNumber(),
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
