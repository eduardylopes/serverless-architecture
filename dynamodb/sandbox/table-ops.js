const {
  DynamoDBClient,
  ListTablesCommand,
  DescribeTableCommand,
  CreateTableCommand,
} = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({ region: 'sa-east-1' });

list = async (event) => {
  const command = new ListTablesCommand({});
  const { TableNames } = await client.send(command);
  const result = TableNames.entries();
  console.log(result);
};

describe = async (event) => {
  const command = new DescribeTableCommand({ TableName: 'td_notes' });
  const { Table } = await client.send(command);
  const result = Table.ItemCount;
  console.log(result);
};

createTable = async (event) => {
  const command = new CreateTableCommand({
    TableName: 'td_notes_sdk',
    AttributeDefinitions: [
      { AttributeName: 'user_id', AttributeType: 'S' },
      { AttributeName: 'timestamp', AttributeType: 'T' },
    ],
    KeySchema: [
      { AttributeName: 'user_id', AttributeType: 'HASH' },
      { AttributeName: 'timestamp', AttributeType: 'RANGE' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });
  const { TableDescription } = await client.send(command);
  const result = TableDescription;
  console.log(result);
};

createTable();
