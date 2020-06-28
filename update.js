import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // Key defines the partition key and sort key of the item to be updated
    // - userId: Odentity pool identity id of the authenticated user
    // - noteId: path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParams.id
    },
    // UpdateExpression defines the attributes to be updated
    // ExpressionAttributeValues defines the value in the updated expression
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null
    },
    // ReturnValues specifies if and how to return the item's attributes
    // where ALL_NEW returns all Attributes of the item after the update;
    // you can inspect result below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };
  await dynamoDb.query(params);

  // Return the matching list of items in response body
  return { status: true};
});