var http = require("http");
var routes = require("app/routes");
var router = require("app/router").router(routes);

var runAllMiddleware = function(req, res, middlewares) {
  return Promise.all(middlewares.map(function(middleware) {
    return new Promise(function(resolve, reject) {
      middleware(req, res, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }));
};

var app = {
  middlewares: [],

  use: function(middleware) {
    this.middlewares.push(middleware);
  },

  handler: function(req, res) {
    req.on("error", function(err) {
      console.error("req.on('error'): ", err);
    });
    res.on("error", function(err) {
      console.error("res.on('error'): ", err);
    });
    runAllMiddleware(req, res, this.middlewares)
      .then(function() {
        router(req, res);
      })
      .catch(function(err) {
        // TODO: we could handle all middleware errors here
      });
  },

  server: http.createServer(),

  listen: function(port) {
    this.server.on("request", this.handler.bind(this));
    this.server.listen(port);
  }
};


export default app;
