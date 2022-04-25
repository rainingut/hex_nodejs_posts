const headers = require('../utility/headers');

const successHandler = (response, content) => {
  response.writeHead(200, headers);
  if(content) {
    response.write(JSON.stringify({
      status: true,
      ...content
    }));
  }
  response.end();
}

module.exports = successHandler;