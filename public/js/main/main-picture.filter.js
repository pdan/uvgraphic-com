export default function() {
  return function(input) {
    for (var i in input) {
      if (input[i].main === true) {
        return input[i].filename;
      }
    }
  };
}
