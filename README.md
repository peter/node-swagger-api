# Swagger based Node/TypeScript REST API

## Minimizing dependencies

I strive to minimize dependencies and rely on the Node core library instead where
possible. The Express framework has around 4 thousand lines of code but with about
40 dependencies the total code size is around 14 thousand lines of code. It turns
out a basic JSON REST API can be built with a much smaller codebase.

The app initially depended on [connect](https://github.com/senchalabs/connect)
for middleware support and although connect is minimal and may be needed
down the line depending on what API you are building and which middlewares
you need I decided to remove that dependency for now.

## Installation

```
npm install
```

## Starting the Server

```
npm start
```

## Building TypeScript

```
npm run build
```

## Example CRUD API

```bash
# list
curl -i http://localhost:3000/v1/articles

# get
curl -i http://localhost:3000/v1/articles/123

# create
curl -X POST -i -d '{"foo": 1}' http://localhost:3000/v1/articles

# update
curl -X PUT -i -d '{"foo": 1}' http://localhost:3000/v1/articles/123

# delete
curl -X DELETE -i http://localhost:3000/v1/articles/123
```

## Example: Measuring Response Time

```js
app.server.on("request", function(req, res) {
  var requestTime = process.hrtime();
  res.on("finish", function() {
    var diff = process.hrtime(requestTime);
    var responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
    console.log("Response time: ", responseTime);
  });
});
```

## Resources

* [Anatomy of an HTTP Transaction](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction)
* [typescript getting error TS2304: cannot find name ' require'](http://stackoverflow.com/questions/31173738/typescript-getting-error-ts2304-cannot-find-name-require)

## TODO

* Logging
* Handle swagger data types in query/body/params parsing
* Swagger validation for query/body/params parsing
* Convert to TypeScript
