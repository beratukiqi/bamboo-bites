import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  const { status } = event.pathParameters;
  console.log(status);
  const statusValue = status;

  console.log("Event before", event);
  console.log("status", statusValue);

  const timeStampValue = event.queryStringParameters
    ? event.queryStringParameters.timeStamp
    : null;
  console.log("time", timeStampValue);

  try {
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
    console.log("Response", response);

    return sendResponse(200, {
      success: true,
      message: "Retrieved orders by timestamp",
      filteredOrders: filteredOrders,
      timestamp: timeStampValue,
      statusValue,
      event,
    });
  } catch (error) {
    console.log("error", error);
    return sendResponse(500, {
      success: false,
      message: "Unable to retreive orders by timestamp",
      error,
      timestamp: timeStampValue,
      statusValue,
      event,
    });
  }
};
