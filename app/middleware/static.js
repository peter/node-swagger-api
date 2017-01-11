var parseUrl = url = require("url").parse;
var fs = require("fs");
var extname = require("path").extname;

var serveStatic = function(baseDir) {
  return function(req, res, next) {
    if (req.method == "GET") {
      var path = parseUrl(req.url).path,
          filePath = baseDir + path,
          // NOTE: could use https://www.npmjs.com/package/mime
          mimeTypes = {
            ".html": "text/html",
            ".jpeg": "image/jpeg",
            ".jpg": "image/jpeg",
            ".png": "image/png",
            ".gif": "image/gif",
            ".js": "text/javascript",
            ".css": "text/css"
          };
      fs.stat(filePath, function(err, stat) {
        if (!err && stat.isFile()) {
            fs.readFile(filePath, function(err,data) {
            var mimeType = mimeTypes[extname(path)];
            res.writeHead(200, {"Content-Type": mimeType});
            res.end(data);
          });
        } else {
          next();
        }
      });
    } else {
      next();
    }
  };
};

module.exports = {
  serveStatic: serveStatic
};
