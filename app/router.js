var u = require("app/util");
var parseUrl = url = require("url").parse;

var PARAM_NAME_PATTERN = /:[a-z0-9_]+/ig;
var PARAM_VALUE_PATTERN = "([^/]+)";

var parsePath = function(path) {
  var paramNames = [];
  var patternString = path.replace(PARAM_NAME_PATTERN, function(match) {
    paramNames.push(match.substring(1));
    return PARAM_VALUE_PATTERN;
  });
  if (paramNames.length > 0) {
    return {
      pattern: new RegExp("^" + patternString + "$"),
      paramNames: paramNames
    };
  } else {
    return null;
  }
};

var matchRoute = function(requestPath, route) {
  var path = parsePath(route.path);
  if (path && path.pattern) {
    var match = requestPath.match(path.pattern);
    if (match) {
      var paramValues = match.slice(1, path.paramNames.length+1);
      return {params: u.zipObj(path.paramNames, paramValues)};
    } else {
      return false;
    }
  } else {
    return route.path === requestPath;
  }
};

var groupByMethod = function(routes) {
  return routes.reduce(function(map, route) {
    var _method = route.method.toLowerCase();
    map[_method] = map[_method] || [];
    map[_method].push(route);
    return map;
  }, {});
};

var router = function(routes) {
  var routesMap = groupByMethod(routes);
  return function(req, res) {
    var requestPath = parseUrl(req.url).path,
        params = null;
    var route = (routesMap[req.method.toLowerCase()] || []).find(function(r) {
      var match = matchRoute(requestPath, r);
      if (match && match.params) params = match.params;
      return match;
    });
    if (route) {
      if (params) req.params = Object.assign((req.params || {}), params);
      route.handler(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  };
};

module.exports = {
  router: router
};
