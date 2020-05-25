export default function handler(lambda) {
  return function (event, context){
    // Run the lambda
    return Promise.resolve()
      .then(() => lambda(event, context))
      // On success
      .then((responseBody) => [200, responseBody])
      // On failure
      .catch((e) => {
        return [500, {error: e.message}];
      })
      // Return HTTP Response
      .then(([statusCode, body]) => ({
        statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(body),
      }));
  };
}