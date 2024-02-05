// file to export some route files for server.js to use

const routes = require("next-routes")();

//define a new route mapping with wildcard ':'
routes.add('/campaigns/new', '/campaigns/new')
.add('/campaigns/:address', '/campaigns/show' )
.add('/campaigns/:address/requests', '/campaigns/requests/index')
.add('/campaigns/:address/requests/new', '/campaigns/requests/new');


module.exports = routes;