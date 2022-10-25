const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  BatchWriteCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'sa-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const putCommand = async () => {
  const result = await ddbDocClient.send(
    new PutCommand({
      TableName: 'td_notes_sdk',
      Item: {
        user_id: 'ee',
        timestamp: 30,
        title: 'my title 3',
        content: 'my content 3',
      },
    })
  );
  console.log(result);
};

const updateCommand = async () => {
  const result = await ddbDocClient.send(
    new UpdateCommand({
      TableName: 'td_notes_sdk',
      Key: {
        user_id: 'bb',
        timestamp: 1,
      },
      UpdateExpression: 'set #t = :t',
      ExpressionAttributeNames: {
        '#t': 'title',
      },
      ExpressionAttributeValues: {
        ':t': 'Updated title',
      },
    })
  );
  console.log(result);
};

const deleteCommand = async () => {
  const result = await ddbDocClient.send(
    new DeleteCommand({
      TableName: 'td_notes_sdk',
      Key: {
        user_id: 'ee',
        timestamp: 30,
      },
    })
  );

  console.log(result);
};

const batchWriteCommand = async () => {
  const result = await ddbDocClient.send(
    new BatchWriteCommand({
      RequestItems: {
        td_notes_sdk: [
          {
            DeleteRequest: {
              Key: {
                user_id: 'bb',
                timestamp: 1,
              },
            },
          },
          {
            PutRequest: {
              Item: {
                user_id: '11',
                timestamp: 11,
                title: 'Title 11',
                content: 'Content 11',
              },
            },
          },
          {
            PutRequest: {
              Item: {
                user_id: '12',
                timestamp: 12,
                title: 'Title 12',
                content: 'Content 12',
              },
            },
          },
        ],
      },
    })
  );

  console.log(result);
};

// putCommand();
// updateCommand();
// deleteCommand();
batchWriteCommand();
