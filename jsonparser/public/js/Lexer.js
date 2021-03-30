const switchSign = (value) => {
  switch (value) {
    case "[":
    case "]":
      return { type: "array", value };
    case "{":
    case "}":
      return { type: "object", value };
    case ":":
      return { type: "objSeparator", value };
    case "null":
    case "NULL":
      return { type: "null", value };
    case "true":
    case "false":
      return { type: "Boolean", value };
    case "undefined":
      return { type: "undefined", value };
  }
};

const isString = (value) => value[0] === '"';
const isNumber = (value) => !isNaN(parseInt(value));
const isObjSeparator = (value) => value === ":";
const lexer = (arr) =>
  arr.map((value, idx, originArr) => {
    if (isObjSeparator(originArr[idx + 1])) return checkType(value, true);
    else return checkType(value);
  });
const checkType = (value, isKey = false) => {
  if (isKey) return { type: "String", value };
  if (isNumber(value)) return { type: "Number", value };
  if (isString(value)) return { type: "String", value };
  return switchSign(value);
};

module.exports = lexer;
