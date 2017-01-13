function index(req, res) {
   res.writeHead(200, {"Content-Type": "application/json"});
   res.end(JSON.stringify(require("app/swagger")));
};

export default {
  index
};
