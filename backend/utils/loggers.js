function logError(message, error) {
  const logData = {
    "@timestamp": new Date().toISOString(),
    "level": "error",
    "message": message,
    "error": error?.stack,
  };

  console.log(logData);
}

function logInfo(message = "", data) {
  const logData = {
    "@timestamp": new Date().toISOString(),
    "message": message,
    ...data,
  };
  console.log(logData);
}

module.exports = { logInfo, logError };
