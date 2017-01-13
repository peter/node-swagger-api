const parseUrl = require("url").parse;
const parseQuery = require("querystring").parse;

// NOTE: Node query parser supports arrays but not foo[bar] nesting,
// see https://github.com/ljharb/qs
const queryParser = function(req, res, next) {
  const queryString = parseUrl(req.url).query;
  if (queryString) {
    const query = parseQuery(queryString);
    req.params = Object.assign((req.params || {}), query);
  }
  next();
};

export default queryParser;
