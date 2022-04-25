const headers = require('../utility/headers');

const errorHandler = ({response, statusCode, content}) => {
  response.writeHead(statusCode, headers);
  response.write(JSON.stringify({
    status: false,
    ...content,
  }));
  response.end();
}


module.exports = errorHandler;