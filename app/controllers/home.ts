function index(req, res) {
   res.writeHead(302, {Location: "/swagger-ui/index.html"});
   res.end();
};

export default {
  index
};
