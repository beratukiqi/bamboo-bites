import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  const timestamp = JSON.parse(event.body);
  try {
    const command = new QueryCommand({
      TableName: "bamboo-bites-ordersDb",
      IndexName: "timestampIndex",
      KeyConditionExpression: "#timeStamp = :timeStamp",
      ExpressionAttributeValues: {
        ":timeStamp": { S: timestamp },
      },
      ExpressionAttributeNames: {
        "#timeStamp": "Timestamp",
      },
    });

    const response = await docClient.send(command);
    const filteredOrders = response.Items;

    // GET /getOrdersByTimestamp?timestamp=2023-11-20T12:00:00Z

    return sendResponse(200, {
      success: true,
      message: "Retrieved orders by timestamp",
      filteredOrders: filteredOrders,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to retreive orders by timestamp",
    });
  }
};
