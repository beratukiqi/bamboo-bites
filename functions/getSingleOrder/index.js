import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  const orderNr = event.pathParameters.orderNr;

  try {
    const command = new ScanCommand({
      TableName: "bambooBites-orders",
      FilterExpression: "orderNr = :orderNr",
      ExpressionAttributeValues: {
        ":orderNr": parseInt(orderNr),
      },
    });

    const response = await docClient.send(command);
    return sendResponse(200, {
      success: true,
      message: "Filtered order",
      order: response,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Not able to get order",
    });
  }
};
