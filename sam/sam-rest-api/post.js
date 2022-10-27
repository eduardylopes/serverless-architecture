const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  PutItemCommand,
  DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'sa-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const { userId } = event.pathParameters;
  const { firstName, lastName, email, website } = JSON.parse(event.body);

  const item = {
    userId,
    firstName,
    lastName,
    email,
    website,
  };

  const command = new PutItemCommand({
    TableName: tableName,
    Item: item,
  });

  await ddbDocClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Data inserted/updated successfully.',
    }),
  };
};
