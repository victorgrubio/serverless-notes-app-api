import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and the sort key of
    // the item to be retrieved
    // - userId: Identity Pool identity id of the authent. user
    // - noteId: path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };
  await dynamoDb.delete(params);

  // Return the matching list of items in response body
  return { status: true};
});