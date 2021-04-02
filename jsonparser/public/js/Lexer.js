import _ from "./utils";
import { is, isType } from "./checkType.js";

const checkType = ({ value, isKey = false }) => {
  if (isKey) return { type: "String", value };
  if (is.number(value)) return { type: "Number", value: parseFloat(value) };
  if (is.string(value)) return { type: "String", value: value.slice(1, -1) };
  if (is.openArray(value)) return { type: "Array", subType: "open" };
  if (is.closeArray(value)) return { type: "Array", subType: "close" };
  if (is.openObject(value)) return { type: "Object", subType: "open" };
  if (is.closeObject(value)) return { type: "Object", subType: "close" };
  if (is.objSeparator(value)) return { type: "objSeparator" };
  if (is.null(value)) return { type: "null", value: null };
  if (is.boolean(value))
    return { type: "Boolean", value: value === "true" ? true : false };
  if (is.undefined(value)) return { type: "undefined", value: undefined };
};

const preLexer = (arr) => {
  const preLexed = arr.map((value, idx) => {
    if (is.objSeparator(arr[idx + 1])) return checkType({ value, isKey: true });
    else return checkType({ value });
  });
  return preLexed;
};

const objTypeParser = (arr) => {
  const objTypeParsed = arr.map((v, idx) => {
    if (arr[idx + 1] && isType.objSeparator(arr[idx + 1].type)) {
      v["subType"] = "propKey";
    }
    if (arr[idx - 1] && isType.objSeparator(arr[idx - 1].type))
      v["subType"] = "propValue";
    return v;
  });
  return objTypeParsed;
};

const objSeparatorFilter = (arr) =>
  arr.filter(({ type }) => !isType.objSeparator(type));

const lexer = _.pipe(preLexer, objTypeParser);
export default lexer;
