const listPath = function(name) {
  return "/" + name;
};

const idPath = function(name) {
  return listPath(name) + "/{id}";
};

const endpoints = {
  list(name) {
    return {
      "tags" : [name],
      "summary" : ("List " + name),
      "x-handler" : (name + "/list"),
      "responses" : {
        "200" : {
          "description" : ("List of " + name),
        }
      }
    };
  },

  get(name) {
    return {
      "tags" : [name],
      "summary" : ("Get " + name),
      "x-handler" : (name + "/get"),
      "parameters" : [{
        "type" : "integer",
        "name" : "id",
        "in" : "path",
        "required" : true
      }],
      "responses" : {
        "200" : {
          "description" : "Success",
        }
      }
    };
  },

  create(name) {
    return {
      "tags" : [name],
      "summary" : ("Create " + name),
      "x-handler" : (name + "/create"),
      "responses" : {
        "200" : {
          "description" : "Success"
        },
        "422" : {
          "description" : "Validation errors"
        }
      }
    };
  },

  update(name) {
    return {
      "tags" : [name],
      "summary" : ("Update " + name),
      "x-handler" : (name + "/update"),
      "parameters" : [{
        "type" : "integer",
        "name" : "id",
        "in" : "path",
        "required" : true
      }],
      "responses" : {
        "200" : {
          "description" : "Success"
        },
        "422" : {
          "description" : "Validation errors"
        }
      }
    };
  },

  delete(name) {
    return {
      "tags" : [name],
      "summary" : ("Delete " + name),
      "x-handler" : (name + "/delete"),
      "parameters" : [{
        "type" : "integer",
        "name" : "id",
        "in" : "path",
        "required" : true
      }],
      "responses" : {
        "200" : {
          "description" : "Success"
        }
      }
    };
  }
};

function crudPaths(name) {
  const paths = {};
  paths[listPath(name)] = {
    "get" : endpoints.list(name),
    "post" : endpoints.create(name)
  };
  paths[idPath(name)] = {
    "get" : endpoints.get(name),
    "put" : endpoints.update(name),
    "delete" : endpoints.delete(name)
  };
  return paths;
};

export default crudPaths;
