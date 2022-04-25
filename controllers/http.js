const successHandler = require('../utility/successHandler');
const errorHandler   = require('../utility/errorHandler');

const http = {
  cors(response){
    successHandler(response);
  },
  notFound(response){
    const sendData = {
      response,
      statusCode: 404,
      content: {message: '查無此頁'}
    }
    errorHandler(sendData)
  }
};

module.exports = http;