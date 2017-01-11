var index = function(req, res) {
   res.writeHead(200, {"Content-Type": "application/json"});
   res.end(JSON.stringify(require("app/swagger")));
};

module.exports = {
  index: index
};
