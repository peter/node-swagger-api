import app from "app/app";
import queryParser from "app/middleware/query";
import bodyParser from "app/middleware/body";
import serveStatic from "app/middleware/static";

app.use(queryParser);
app.use(bodyParser);
app.use(serveStatic("resources/public"));

const port = process.env["PORT"] || 3000;
app.listen(port);
