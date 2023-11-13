// import { QueryCommand } from "@aws-sdk/lib-dynamodb";
// import { docClient } from "../../services/client";
// import { sendResponse } from "../../responses";

// exports.handler = async (event) => {
//   const orderNr = event.pathParameters.orderNr;

//   try {
//     const command = new QueryCommand({
//       TableName: "bambooBites-orders",
//       KeyConditionExpression: "#onr = :orderNr",
//       ExpressionAttributeNames: {
//         "#onr": "orderNr",
//       },
//       ExpressionAttributeValues: {
//         ":orderNr": parseInt(orderNr),
//       },
//     });

//     const response = await docClient.send(command);

//     return sendResponse(200, {
//       success: true,
//       message: "Filtered order",
//       order: response.Items,
//       orderNr: orderNr,
//     });
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     return sendResponse(500, {
//       success: false,
//       message: "Not able to get order",
//       error: error.message,
//       response: response,
//       orderNr: orderNr,
//     });
//   }
// };
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  const orderNr = event.pathParameters.orderNr;

  try {
    const command = new GetCommand({
      TableName: "bambooBites-orders",
      Key: {
        orderNr: parseInt(orderNr),
      },
    });

    const response = await docClient.send(command);

    if (!response.Item) {
      return sendResponse(404, {
        success: false,
        message: "Order not found",
        orderNr: orderNr,
      });
    }

    return sendResponse(200, {
      success: true,
      message: "Fetched order",
      order: response.Item,
      orderNr: orderNr,
      event: event,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return sendResponse(500, {
      success: false,
      message: "Not able to get order",
      error: error.message,
      orderNr: orderNr,
      event: event,
    });
  }
};
