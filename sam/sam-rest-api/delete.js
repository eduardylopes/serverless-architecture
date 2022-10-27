const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DeleteCommand,
  DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'sa-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const { userId } = event.pathParameters;

  const command = DeleteCommand({
    TableName: tableName,
    Key: {
      userId,
    },
  });

  await ddbDocClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'User deleted successfully.',
    }),
  };
};
