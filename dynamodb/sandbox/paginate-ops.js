const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({ region: 'sa-east-1' });

const getMembers = async (_key) => {
  const command = new ScanCommand({
    TableName: 'td_notes',
    Limit: 2,
    ExclusiveStartKey: _key,
  });
  const { LastEvaluatedKey } = await client.send(command);
  return LastEvaluatedKey;
};

const getData = async () => {
  let key;
  do {
    key = await getMembers(key);
  } while (typeof key !== 'undefined');
};

getData();
