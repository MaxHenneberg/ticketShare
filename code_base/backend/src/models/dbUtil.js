exports.handleCallback = function (err, result) {
  if (err) {
    return {statusCode: 400, error: err};
  }
  if (!result) {
    return {statusCode: 404, error: "NoResult"};
  }
  return null;
};
