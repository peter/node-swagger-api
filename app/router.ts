const u = require("app/util");
const parseUrl = require("url").parse;

const PARAM_NAME_PATTERN = /:[a-z0-9_]+/ig;
const PARAM_VALUE_PATTERN = "([^/]+)";

const parsePath = function(path) {
  const paramNames: string[] = [];
  const patternString = path.replace(PARAM_NAME_PATTERN, function(match: string) {
    paramNames.push(match.substring(1));
    return PARAM_VALUE_PATTERN;
  });
  if (paramNames.length > 0) {
    return {
      pattern: new RegExp("^" + patternString + "$"),
      paramNames
    };
  } else {
    return null;
  }
};

interface RouteMatch {
  matches: boolean;
  params?: Object;
};

const matchRoute = function(requestPath, route): RouteMatch {
  const path = parsePath(route.path);
  if (path && path.pattern) {
    const match = requestPath.match(path.pattern);
    if (match) {
      const paramValues = match.slice(1, path.paramNames.length + 1);
      return {matches: true, params: u.zipObj(path.paramNames, paramValues)};
    } else {
      return {matches: false};
    }
  } else {
    const matches = (route.path === requestPath);
    return {matches};
  }
};

const groupByMethod = function(routes) {
  return routes.reduce(function(map, route) {
    const method = route.method.toLowerCase();
    map[method] = map[method] || [];
    map[method].push(route);
    return map;
  }, {});
};

const router = function(routes) {
  const routesMap = groupByMethod(routes);
  return function(req, res) {
    const requestPath: string = parseUrl(req.url).path;
    let params: Object | null = null;
    const route = (routesMap[req.method.toLowerCase()] || []).find(function(r) {
      const match = matchRoute(requestPath, r);
      if (match.params) params = match.params;
      return match.matches;
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

export default router;
