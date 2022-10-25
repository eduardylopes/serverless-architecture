const moment = require('moment');

const greeting = {
  en: 'Hello',
  fr: 'Bonjour',
  pt: 'Olá',
  hi: 'Namaste',
  es: 'Hola',
  ur: 'Assalmo aleikum',
  it: 'Ciao',
  de: 'Hallo',
};

exports.handler = async (event) => {
  const name = event.pathParameters.name;
  const { lang, ...info } = event.queryStringParameters;

  const message = `${greeting[lang] ? greeting[lang] : greeting['en']} ${name}`;
  const response = {
    message,
    info,
    timestamp: moment().unix(),
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
