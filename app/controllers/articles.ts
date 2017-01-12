var endpoints = {
  list: function(req, res) {
     res.writeHead(200, {"Content-Type": "application/json"});
     var body = {todo: "articles/list", params: req.params};
     res.end(JSON.stringify(body));
  },

  create: function(req, res) {
     res.writeHead(200, {"Content-Type": "application/json"});
     var body = {todo: "articles/create", params: req.params};
     res.end(JSON.stringify(body));
  },

  get: function(req, res) {
     res.writeHead(200, {"Content-Type": "application/json"});
     var body = {todo: "articles/get", params: req.params};
     res.end(JSON.stringify(body));
  },

  update: function(req, res) {
     res.writeHead(200, {"Content-Type": "application/json"});
     var body = {todo: "articles/update", params: req.params};
     res.end(JSON.stringify(body));
  },

  delete: function(req, res) {
     res.writeHead(200, {"Content-Type": "application/json"});
     var body = {todo: "articles/delete", params: req.params};
     res.end(JSON.stringify(body));
  }
};

module.exports = endpoints;
