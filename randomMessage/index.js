const messages = [
  'Hello World!',
  'Hello Serveless',
  'Wendel físico!',
  'On cloud nine!',
  'Shooting for the stars!',
  'On top of the World!',
  'World at my feet!',
];

exports.handler = async (event) => {
  return messages[Math.round(Math.random() * 9)];
};
