const { sendResponse } = require('../util/response');
const { default: statusCode } = require('../statusCode');

const app = module.exports = require('express')();

app.get('/', (req, res) => {
  return sendResponse(res, statusCode.SUCCESS, {msg: "Hi Developer!"});
});

app.use('/user', require('./user'));

// catch all
app.all('*', (req, res) => {
  sendResponse(res, statusCode.NOT_FOUND, {msg: 'not found'}, true);
});