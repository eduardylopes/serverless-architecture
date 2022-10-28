const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { GetCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const ResponseModel = require('./response-model');

const client = new DynamoDBClient({ region: 'sa-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const { userId } = event.pathParameters;

  const command = new GetCommand({
    TableName: tableName,
    Key: {
      userId,
    },
  });

  const { Item } = await ddbDocClient.send(command);

  if (!Item) return new ResponseModel(404, 'User not found');

  return new ResponseModel(201, 'User found', Item);
};
