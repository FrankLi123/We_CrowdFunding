// file to export some route files for server.js to use

const routes = require("next-routes")();

//define a new route mapping with wildcard ':'
routes.add('/campaigns/new', '/campaigns/new')
.add('/campaigns/:address', '/campaigns/show' );

module.exports = routes;