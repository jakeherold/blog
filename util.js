function util() {}



util.getUnique = function(array) {
  var u = {},
    a = [];
  for (var i = 0, l = array.length; i < l; ++i) {
    if (u.hasOwnProperty(array[i])) {
      continue;
    }
    a.push(array[i]);
    u[array[i]] = 1;
  }
  console.log(a);
  return a;
};
