const dirname = require("path").dirname;
const basename = require("path").basename;
import swagger from "app/swagger";

// Changes syntax from /articles/{id} to /articles/:id
const convertParamSyntax = function(path) {
  return path.replace(/\{[a-z0-9_]+\}/i, function(match) {
    return ":" + match.substring(1, (match.length - 1));
  });
};

const fullPath = function(path, endpoint) {
  if (endpoint["x-api-prefix"] === false) {
    return path;
  } else {
    return swagger.basePath + path;
  }
};

const routePath = function(path, endpoint) {
  return convertParamSyntax(fullPath(path, endpoint));
};

const routes = Object.keys(swagger.paths).map(function(path) {
  const methods = swagger.paths[path];
  return Object.keys(methods).map(function(m) {
    const endpoint = methods[m],
          handlerPath = endpoint["x-handler"],
          controllerPath = ("app/controllers/" + dirname(handlerPath)),
          controller = require(controllerPath),
          handler = controller.default[basename(handlerPath)];
    return {
      path: routePath(path, endpoint),
      method: m,
      handler,
      swagger: endpoint
    };
  });
}).reduce(function(a, b) { return a.concat(b); }, []);

export default routes;
