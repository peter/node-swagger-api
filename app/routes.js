var dirname = require("path").dirname,
    basename = require("path").basename,
    swagger = require("app/swagger");

// Changes syntax from /articles/{id} to /articles/:id
var convertParamSyntax = function(path) {
  return path.replace(/\{[a-z0-9_]+\}/i, function(match) {
    return ":" + match.substring(1, (match.length-1));
  });
};

var fullPath = function(path, endpoint) {
  if (endpoint["x-api-prefix"] === false) {
    return path;
  } else {
    return swagger.basePath + path;
  }
};

var routePath = function(path, endpoint) {
  return convertParamSyntax(fullPath(path, endpoint));
};

var routes = Object.keys(swagger.paths).map(function(path) {
  var methods = swagger.paths[path];
  return Object.keys(methods).map(function(m) {
    var endpoint = methods[m],
        handlerPath = endpoint["x-handler"],
        controllerPath = ("app/controllers/" + dirname(handlerPath)),
        controller = require(controllerPath),
        handler = controller[basename(handlerPath)];
    return {
      path: routePath(path, endpoint),
      method: m,
      handler: handler,
      swagger: endpoint
    };
  });
}).reduce(function(a, b) { return a.concat(b); }, []);

module.exports = routes;
