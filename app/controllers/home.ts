var index = function(req, res) {
   res.writeHead(302, {"Location": "/swagger-ui/index.html"});
   res.end();
};

module.exports = {
  index: index
};
