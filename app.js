const routes = require('./routes');
require('./connections');


const app = async(request, response) => {
  routes(request, response);
}

module.exports = app;