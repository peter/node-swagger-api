const endpoints = {
  list(req, res) {
     res.writeHead(200, {"Content-Type": "application/json"});
     const body = {todo: "articles/list", params: req.params};
     res.end(JSON.stringify(body));
  },

  create(req, res) {
     res.writeHead(200, {"Content-Type": "application/json"});
     const body = {todo: "articles/create", params: req.params};
     res.end(JSON.stringify(body));
  },

  get(req, res) {
     res.writeHead(200, {"Content-Type": "application/json"});
     const body = {todo: "articles/get", params: req.params};
     res.end(JSON.stringify(body));
  },

  update(req, res) {
     res.writeHead(200, {"Content-Type": "application/json"});
     const body = {todo: "articles/update", params: req.params};
     res.end(JSON.stringify(body));
  },

  delete(req, res) {
     res.writeHead(200, {"Content-Type": "application/json"});
     const body = {todo: "articles/delete", params: req.params};
     res.end(JSON.stringify(body));
  }
};

export default endpoints;
