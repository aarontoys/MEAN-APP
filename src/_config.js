var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/first-mean-app',
  test: 'mongodb://localhost/first-mean-app-testing',
  production: process.env.MONGODB_URI
};

// config.SALT_WORK_FACTOR = {
//   development: 10,
//   test: 10,
//   production: 12
// }
config.SALT_WORK_FACTOR = 10;
config.TOKEN_SECRET = '9\x10\x9fY\xb6\x10\xf4AF\xdc'

module.exports = config;