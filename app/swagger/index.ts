import crudPaths from "app/swagger/resource";

const RESOURCES = ["articles"];

const resourcePaths = RESOURCES.reduce(function(paths, name) {
  return Object.assign(paths, crudPaths(name));
}, {});

const swagger: any = {
  swagger: "2.0",
  info: {
    title: "Swagger based JSON REST API",
    description: "An example Node.js REST API based on a Swagger specification",
    version: "1.0"
  },
  basePath: "/v1",
  produces: [
      "application/json"
  ],
  paths: Object.assign(resourcePaths, {
    "/": {
      get: {
        tags: ["api docs"],
        summary: "Swagger API Documentation HTML page",
        "x-handler": "home/index",
        "x-api-prefix": false,
        "x-auth-required": false,
        responses: {
          301: {
            description: "Redirect to HTML page with Swagger API docs"
          }
        }
      }
    },
    "/swagger.json": {
      get: {
        tags: ["api docs"],
        summary: "Swagger API JSON specification",
        "x-handler": "swagger/index",
        "x-auth-required": false,
        responses: {
          200: {
            description: "Swagger JSON API specification"
          }
        }
      }
    }
  })
};

export default swagger;
