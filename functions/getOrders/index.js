import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  try {
    const command = new ScanCommand({
      TableName: "bamboo-bites-ordersDb",
    });

    const response = await docClient.send(command);
    const orders = response.Items;

    return sendResponse(200, { success: true, orders });
  } catch (error) {
    return sendResponse(
      500,
      { success: false, message: "Unable to get orders" },
      error
    );
  }
};
