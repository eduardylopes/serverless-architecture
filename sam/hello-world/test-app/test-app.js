const AWS = require('aws-sdk');
AWS.config.update({ region: 'sa-east-1' });

const lambda = new AWS.Lambda({
  endpoint: 'http://127.0.0.1:3001/',
});

const params = {
  FunctionName: 'HelloWorldFunction',
  Payload: new Buffer.from('{ "name": "Eduardy Lopes" }'),
};

lambda.invoke(params, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
