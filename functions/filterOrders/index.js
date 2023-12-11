import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  const { status } = event.pathParameters;
  const statusValue = status;

  const timeStampValue = event.queryStringParameters
    ? event.queryStringParameters.timeStamp
    : null;

  try {
    console.log(
      "Querying orders with status:",
      statusValue,
      "and timestamp:",
      timeStampValue
    );

    const command = new QueryCommand({
      TableName: "bamboo-bites-ordersDb",
      IndexName: "filterIndex",
      KeyConditionExpression: "#status = :status AND #timeStamp >= :timeStamp",
      ExpressionAttributeValues: {
        ":status": statusValue,
        ":timeStamp": timeStampValue,
      },
      ExpressionAttributeNames: {
        "#status": "status",
        "#timeStamp": "timeStamp",
      },
    });

    const response = await docClient.send(command);
    const filteredOrders = response.Items;

    return sendResponse(200, {
      success: true,
      message: "Retrieved orders by timestamp",
      filteredOrders: filteredOrders,
      timestamp: timeStampValue,
      statusValue,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to retreive orders by timestamp",
      error,
      timestamp: timeStampValue,
      statusValue,
    });
  }
};
