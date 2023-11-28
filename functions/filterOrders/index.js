import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  // const timestampValue = "2023-11-21T08:49:44";
  // const statusValue = "pending";

  // try {
  //   const command = new QueryCommand({
  //     TableName: "bamboo-bites-ordersDb",
  //     IndexName: "filterIndex",
  //     KeyConditionExpression:
  //       "#status = :statusValue AND #timeStamp >= :timestampValue",
  //     ExpressionAttributeValues: {
  //       ":statusValue": statusValue,
  //       ":timestampValue": timestampValue,
  //     },
  //     ExpressionAttributeNames: {
  //       "#status": "status",
  //       "#timeStamp": "timeStamp",
  //     },
  //   });

  //   const response = await docClient.send(command);
  //   const filteredOrders = response.Items;
  //   console.log("Response", response);

  //   return sendResponse(200, {
  //     success: true,
  //     message: "Retrieved orders by timestamp",
  //     filteredOrders: filteredOrders,
  //     timestamp: timestampValue,
  //     statusValue,
  //     event,
  //   });
  // } catch (error) {
  //   console.log("error", error);
  //   return sendResponse(500, {
  //     success: false,
  //     message: "Unable to retreive orders by timestamp",
  //     error,
  //     timestamp: timestampValue,
  //     statusValue,
  //     event,
  //   });
  // }
  // const statusValue = event.pathparameters.status;
  const { status } = event.pathParameters;
  console.log(status);
  const statusValue = status;

  // const { timestamp } = JSON.parse(event.body);
  console.log("Event before", event);
  console.log("status", statusValue);
  // const timeStampValue = "2023-11-28T00:00:00";
  const timeStampValue = event.queryStringParameters
    ? event.queryStringParameters.timeStamp
    : null;
  console.log("time", timeStampValue);
  // const statusValue = "pending";
  try {
    const command = new QueryCommand({
      TableName: "bamboo-bites-ordersDb",
      IndexName: "filterIndex",
      KeyConditionExpression: "#status = :status AND #timeStamp >= :timeStamp",
      ExpressionAttributeValues: {
        ":status": statusValue, // Replace with your actual status value
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

    // GET /getOrdersByTimestamp?timestamp=2023-11-20T12:00:00Z

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
