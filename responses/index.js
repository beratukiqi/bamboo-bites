function sendResponse(statusCode, response) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(response),
  };
}

module.exports = { sendResponse };
