var assert = require("assert");

var bodyParser = function(req, res, next) {
  if (req.method == "POST" || req.method == "PUT") {
    var data : Array<Buffer> = [];
    req.on("data", function(chunk) {
      data.push(chunk);
    });
    req.on("end", function() {
      try {
        let bodyString = Buffer.concat(data).toString();
        let body = JSON.parse(bodyString);
        assert((typeof body === "object"), "JSON body must be an object");
        req.params = Object.assign((req.params || {}), body);
        next();
      } catch (e) {
        res.writeHead(400, {"Content-Type": "application/json"});
        let body = {error: {type: "invalid_json_body", message: e.message}};
        res.end(JSON.stringify(body));
        next(e);
      }
    });
  } else {
    next();
  }
};

module.exports = {
  bodyParser: bodyParser
};
