const _ = require("./utils");

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

const checkType = (value, isKey = false) => {
  if (isKey) return { type: "String", value };
  if (isNumber(value)) return { type: "Number", value };
  if (isString(value)) return { type: "String", value };
  return switchSign(value);
};

const preLexer = (arr) =>
  arr.map((value, idx, originArr) => {
    if (isObjSeparator(originArr[idx + 1])) return checkType(value, true);
    else return checkType(value);
  });

const stringParser = (arr) =>
  arr.map(({ type, value }) => {
    value = value.replace(/^"/gi, "").replace(/"$/gi, "");
    return { type, value };
  });

const lexer = _.pipe(preLexer, stringParser);
module.exports = lexer;
