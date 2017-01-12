import app from "app/app";
var queryParser = require("app/middleware/query").queryParser;
var bodyParser = require("app/middleware/body").bodyParser;
var serveStatic = require("app/middleware/static").serveStatic;

app.use(queryParser);
app.use(bodyParser);
app.use(serveStatic("resources/public"));

var port = process.env["PORT"] || 3000;
app.listen(port);
