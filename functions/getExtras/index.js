import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  try {
    const command = new ScanCommand({
      TableName: "bambooBites-extras",
    });

    const response = await docClient.send(command);
    const extras = response.Items;

    return sendResponse(200, { success: true, extras });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to get extras",
      error,
    });
  }
};
