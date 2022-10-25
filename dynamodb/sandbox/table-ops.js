const {
  DynamoDBClient,
  ListTablesCommand,
  DescribeTableCommand,
  CreateTableCommand,
  UpdateTableCommand,
  DeleteTableCommand,
} = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({ region: 'sa-east-1' });

listTable = async () => {
  const command = new ListTablesCommand({});
  const { TableNames } = await client.send(command);
  console.log(TableNames);
};

describeTable = async () => {
  const command = new DescribeTableCommand({ TableName: 'td_notes' });
  const { Table } = await client.send(command);
  console.log(Table.ItemCount);
};

createTable = async () => {
  const command = new CreateTableCommand({
    TableName: 'td_notes_ondemand',
    AttributeDefinitions: [
      { AttributeName: 'user_id', AttributeType: 'S' },
      { AttributeName: 'timestamp', AttributeType: 'N' },
    ],
    KeySchema: [
      { AttributeName: 'user_id', KeyType: 'HASH' },
      { AttributeName: 'timestamp', KeyType: 'RANGE' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  });
  const { TableDescription } = await client.send(command);
  console.log(TableDescription);
};

updateTable = async () => {
  const command = new UpdateTableCommand({
    TableName: 'td_notes_ondemand',
    ProvisionedThroughput: {
      ReadCapacityUnits: 2,
      WriteCapacityUnits: 1,
    },
  });
  const { TableDescription } = await client.send(command);
  console.log(TableDescription);
};

deleteTable = async () => {
  const command = new DeleteTableCommand({
    TableName: 'td_notes_ondemand',
  });
  const { TableDescription } = await client.send(command);
  console.log(TableDescription);
};

// listTable();
// describeTable();
// createTable();
// updateTable();
// deleteTable();
