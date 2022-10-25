const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  ScanCommand,
  BatchGetCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'sa-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const getCommand = async () => {
  const result = await ddbDocClient.send(
    new GetCommand({
      TableName: 'td_notes_sdk',
      Key: {
        user_id: 'ABC',
        timestamp: 1,
      },
    })
  );
  console.log(result);
};

const queryCommand = async () => {
  const result = await ddbDocClient.send(
    new QueryCommand({
      TableName: 'td_notes_sdk',
      KeyConditionExpression: 'user_id = :uid',
      ExpressionAttributeValues: {
        ':uid': 'cc',
      },
    })
  );
  console.log(result);
};

const scanCommand = async () => {
  const result = await ddbDocClient.send(
    new ScanCommand({
      TableName: 'td_notes_sdk',
      FilterExpression: 'title = :title',
      ExpressionAttributeValues: {
        ':title': 'Initial Title',
      },
    })
  );
  console.log(result);
};

const batchGetCommand = async () => {
  const result = await ddbDocClient.send(
    new BatchGetCommand({
      RequestItems: {
        td_notes: {
          Keys: [
            {
              user_id: 'aa2dsd123asd',
              timestamp: 1666661045,
            },
            {
              user_id: 'aadasa2d12s3asd',
              timestamp: 1666661060,
            },
          ],
        },
        td_notes_sdk: {
          Keys: [{ user_id: 'ee', timestamp: 30 }],
        },
      },
    })
  );
  console.log(JSON.stringify(result, null, 2));
};

// getCommand();
// queryCommand();
// scanCommand();
batchGetCommand();
