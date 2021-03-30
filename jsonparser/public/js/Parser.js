const preParser = (arr, stack) => {
  if (!arr.length) return stack;
  const cur = arr.shift();
  console.log(cur);
  switch (cur.type) {
    case "openArray":
      stack.push("Array");

      break;
    case "openObject":
      stack.push("Obj");

      break;
    case "closeArray":
      stack.pop();
      break;
    case "closeObject":
      stack.pop();
      break;
  }
  return preParser(arr, stack);
};

const parser = (arr) => {
  let stack = [];
  console.log(preParser(arr, stack));
};

module.exports = parser;
