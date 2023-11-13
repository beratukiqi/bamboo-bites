import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  const orderNr = JSON.parse(event.body);

  try {
    const command = new ScanCommand({
      TableName: "bambooBites-orders",
      FilterExpression: "orderNr = :orderNr",
      ExpressionAttributeValues: {
        ":orderNr": orderNr,
      },
    });

    const response = await docClient.send(command);
    return sendResponse(200, {
      success: true,
      message: "Filtered order",
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Not able to get order",
    });
  }
};
