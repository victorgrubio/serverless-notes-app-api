import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  /**
   * Endpoint to retrieve Notes (/get on dynamoDB)
   */

  const params = {
    TableName: process.env.TableName || "notes",
    // 'Key' defines the partition key and the sort key of
    // the item to be retrieved
    // - userId: Identity Pool identity id of the authent. user
    // - noteId: path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  const result = await dynamoDb.get(params);

  if (! result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
});