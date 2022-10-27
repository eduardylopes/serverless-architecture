const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { GetCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'sa-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const { userId } = event.pathParameters;

  const command = GetCommand({
    TableName: tableName,
    Key: {
      userId,
    },
  });

  const { Item } = await ddbDocClient.send(command);

  if (!Item) throw new Error('User not found');

  return {
    statusCode: 200,
    body: JSON.stringify(Item),
  };
};
