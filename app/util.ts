function zip(...arrays) {
  return arrays[0].map(function(_, i){
    return arrays.map(function(array) {
      return array[i];
    });
  });
};

function zipObj(keys: any[], values: any[]): Object {
  return zip(keys, values).reduce(function(obj, tuple) {
    obj[tuple[0]] = tuple[1];
    return obj;
  }, {});
};

module.exports = {
  zip,
  zipObj
};
