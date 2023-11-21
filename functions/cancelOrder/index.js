import { sendResponse } from "../../responses";
import { docClient } from "../../services/client";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

exports.handler = async (event) => {
  const { orderNr } = event.pathParameters;

  try {
    const command = new DeleteCommand({
      TableName: "bamboo-bites-ordersDb",
      Key: {
        orderNr: parseInt(orderNr),
      },
    });

    const response = await docClient.send(command);
    return sendResponse(200, {
      success: true,
      message: "Your order has been removed",
      orderNr: orderNr,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to remove order",
      error: error,
      orderNr: orderNr,
    });
  }
};
