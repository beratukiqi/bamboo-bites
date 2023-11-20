import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  const { orderNr } = event.pathParameters;

  try {
    const command = new ScanCommand({
      TableName: "bamboo-bites-orders",
      FilterExpression: "orderNr = :orderNr",
      ExpressionAttributeValues: {
        ":orderNr": { N: orderNr }, // Assuming orderNr is a Number
      },
    });
    // const command = new GetCommand({
    //   TableName: "bamboo-bites-orders",
    //   Key: {
    //     orderNr: { N: orderNr }, // Assuming orderNr is a Number
    //   },
    // });

    const response = await docClient.send(command);
    const orders = response.Items;
    console.log(orders);

    if (!orders) {
      return sendResponse(404, {
        success: false,
        message: "Order not found",
        orderNr: orderNr,
      });
    }

    const order = orders[0];
    return sendResponse(200, {
      success: true,
      message: "Fetched order",
      order: order,
      orderNr: orderNr,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return sendResponse(500, {
      success: false,
      message: "Unable to get order",
      orderNr: orderNr,
    });
  }
};

// import { GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
// import { GetItemCommand } from "@aws-sdk/client-dynamodb";
// import { docClient } from "../../services/client";
// import { sendResponse } from "../../responses";

// exports.handler = async (event) => {
//   const { orderNr } = event.pathParameters;

//   try {
//     const command = new QueryCommand({
//       TableName: "bamboo-bites-orders",
//       // Key: {
//       //   orderNr: parseInt(orderNr),
//       //   // orderNr: 67565603,
//       //   // timeStamp: "2023-11-20T13:27:11",
//       // },
//       KeyConditionExpression: "orderNr = :orderNr",
//       ExpressionAttributeValues: {
//         ":orderNr": { N: orderNr }, // Assuming orderNr is a Number
//       },
//     });

//     const response = await docClient.send(command);
//     const order = response.Item;

//     if (!order) {
//       return sendResponse(404, {
//         success: false,
//         message: "Order not found",
//         orderNr: orderNr,
//       });
//     }

//     return sendResponse(200, {
//       success: true,
//       message: "Fetched order",
//       order: order,
//       orderNr: orderNr,
//     });
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     return sendResponse(500, {
//       success: false,
//       message: "Unable to get order",
//       orderNr: orderNr,
//     });
//   }
// };
