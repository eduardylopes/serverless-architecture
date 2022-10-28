const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { PutCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const ResponseModel = require('./response-model');

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

  const command = new PutCommand({
    TableName: tableName,
    Item: item,
    ConditionExpression: 'attribute_not_exists(#userId)',
    ExpressionAttributeNames: {
      '#userId': 'userId',
    },
  });

  try {
    await ddbDocClient.send(command);
    return new ResponseModel(201, 'User successfully created.');
  } catch (e) {
    if (e.name === 'ConditionalCheckFailedException') {
      return new ResponseModel(403, 'User already exists.');
    }
  }
};
