const http = require("http");
const routes = require("app/routes");
import router from "app/router";

function runAllMiddleware(req, res, middlewares) {
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

const app = {
  middlewares: [],

  router: router(routes),

  use(middleware) {
    this.middlewares.push(middleware);
  },

  handler(req, res) {
    req.on("error", function(err) {
      console.error("req.on('error'): ", err);
    });
    res.on("error", function(err) {
      console.error("res.on('error'): ", err);
    });
    runAllMiddleware(req, res, this.middlewares)
      .then(function() {
        this.router(req, res);
      })
      .catch(function(err) {
        // TODO: we could handle all middleware errors here
      });
  },

  server: http.createServer(),

  listen(port) {
    this.server.on("request", this.handler.bind(this));
    this.server.listen(port);
  }
};

export default app;
