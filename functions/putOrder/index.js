import { sendResponse } from "../../responses/index";
import { docClient } from "../../services/client";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { nanoid } from "nanoid";

exports.handler = async (event) => {
  const order = JSON.parse(event.body); // [{},{}]

  try {
    // const orderNr = nanoid(); This will generate a string do we want string och number?
    const orderNr = 4;
    // let order = [
    //   { id: 1, name: "Something good", price: 10, desc: "so so good" },
    //   { id: 1, name: "Something good", price: 10, desc: "so so good" },
    // ];

    const command = new PutCommand({
      TableName: "bambooBites-orders",
      Item: {
        orderNr: orderNr,
        order: order,
      },
    });

    const response = await docClient.send(command);
    return sendResponse(200, {
      success: true,
      message: "A new order has been added",
      orderNr: orderNr,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Could not add order",
    });
  }
};
