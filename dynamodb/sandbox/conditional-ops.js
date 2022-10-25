const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'sa-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const putCommand = async () => {
  const result = await ddbDocClient.send(
    new PutCommand({
      TableName: 'td_notes_sdk',
      Item: {
        user_id: 'ABC',
        timestamp: 1,
        title: 'NewInitial Title',
        content: 'New Initial content',
      },
      ConditionExpression: '#t <> :t',
      ExpressionAttributeNames: {
        '#t': 'timestamp',
      },
      ExpressionAttributeValues: {
        ':t': 1,
      },
    })
  );
  console.log(result);
};

putCommand();
