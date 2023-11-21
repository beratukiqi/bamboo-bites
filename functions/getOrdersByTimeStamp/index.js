import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  // const timestamp = JSON.parse(event.body.timeStamp);
  console.log("Event before", event);
  const timestamp = "2023-11-21T08:49:44";
  try {
    const command = new QueryCommand({
      TableName: "bamboo-bites-ordersDb",
      IndexName: "timestampIndex",
      KeyConditionExpression: "#timeStamp > :start",
      ExpressionAttributeValues: {
        ":start": "0",
      },
      ExpressionAttributeNames: {
        "#timeStamp": "timeStamp",
      },
      ScanIndexForward: false, // Sort in descending order
      Limit: 10, // Limit the result to 10 records
    });

    const response = await docClient.send(command);
    const filteredOrders = response.Items;
    console.log("Response", response);

    // GET /getOrdersByTimestamp?timestamp=2023-11-20T12:00:00Z

    return sendResponse(200, {
      success: true,
      message: "Retrieved orders by timestamp",
      filteredOrders: filteredOrders,
      timestamp: timestamp,
      event,
    });
  } catch (error) {
    console.log("error", error);
    return sendResponse(500, {
      success: false,
      message: "Unable to retreive orders by timestamp",
      error,
      timestamp: timestamp,
      event,
    });
  }
};
