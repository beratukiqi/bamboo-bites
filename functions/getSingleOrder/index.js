import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  const { orderNr } = event.pathParameters;

  try {
    const command = new GetCommand({
      TableName: "bambooBites-orders",
      Key: {
        orderNr: parseInt(orderNr),
      },
    });

    const response = await docClient.send(command);
    const order = response.Item;

    if (!order) {
      return sendResponse(404, {
        success: false,
        message: "Order not found",
        orderNr: orderNr,
      });
    }

    return sendResponse(200, {
      success: true,
      message: "Fetched order",
      order: order,
      orderNr: orderNr,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return sendResponse(500, {
      success: false,
      message: "Unable to get order",
      orderNr: orderNr,
    });
  }
};
