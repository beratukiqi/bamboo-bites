import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { sendResponse } from "../../responses";
import { docClient } from "../../services/client";

exports.handler = async (event) => {
  const { orderNr, status } = JSON.parse(event.body);

  try {
    const command = new UpdateCommand({
      TableName: "bamboo-bites-ordersDb",
      Key: { orderNr: parseInt(orderNr) },
      UpdateExpression: "set #statusField = :status",
      ExpressionAttributeNames: {
        "#statusField": "status",
      },
      ExpressionAttributeValues: { ":status": status },
      ReturnValues: "ALL_NEW",
    });

    const response = await docClient.send(command);
    const updatedOrder = response.Attributes;

    return sendResponse(200, {
      success: true,
      message: "Order status has been updated",
      order: updatedOrder,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to update order status",
      error,
    });
  }
};
