var parseUrl = require("url").parse;
var parseQuery = require("querystring").parse;

// NOTE: Node query parser supports arrays but not foo[bar] nesting,
// see https://github.com/ljharb/qs
var queryParser = function(req, res, next) {
  var queryString = parseUrl(req.url).query;
  if (queryString) {
    var query = parseQuery(queryString);
    req.params = Object.assign((req.params || {}), query);
  }
  next();
};

module.exports = {
  queryParser: queryParser
};
