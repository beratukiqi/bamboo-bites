import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  const orderNr = event.pathParameters.orderNr;

  try {
    const command = new QueryCommand({
      TableName: "bambooBites-orders",
      KeyConditionExpression: "#onr = :orderNr",
      ExpressionAttributeNames: {
        "#onr": "orderNr",
      },
      ExpressionAttributeValues: {
        ":orderNr": parseInt(orderNr),
      },
    });

    const response = await docClient.send(command);

    return sendResponse(200, {
      success: true,
      message: "Filtered order",
      order: response.Items,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return sendResponse(500, {
      success: false,
      message: "Not able to get order",
      error: error.message,
    });
  }
};
