const _ = require('./utils');

const isString = (value) => value[0] === '"';
const isNumber = (value) => !isNaN(parseInt(value));
const isObjSeparator = (value) => value === ':';

const switchSign = (value) => {
  switch (value) {
    case '[':
      return { type: 'Array', subType: 'open' };
    case ']':
      return { type: 'Array', subType: 'close' };
    case '{':
      return { type: 'Object', subType: 'open' };
    case '}':
      return { type: 'Object', subType: 'close' };
    case ':':
      return { type: 'objSeparator' };
    case 'null':
    case 'NULL':
      return { type: 'null', value: null };
    case 'true':
      return { type: 'Boolean', value: true };
    case 'false':
      return { type: 'Boolean', value: false };
    case 'undefined':
      return { type: 'undefined', value: undefined };
  }
};

const checkType = (value, isKey = false) => {
  if (isKey) return { type: 'String', value };
  if (isNumber(value)) return { type: 'Number', value: parseFloat(value) };
  if (isString(value)) return { type: 'String', value };
  return switchSign(value);
};

const preLexer = (arr) => {
  const preLexed = arr.map((value, idx, originArr) => {
    if (isObjSeparator(originArr[idx + 1])) return checkType(value, true);
    else return checkType(value);
  });
  return preLexed;
};

const stringParser = (arr) => {
  const stringParsed = arr.map((v) => {
    if (v.type === 'String') v.value = v.value.replace(/^"/gi, '').replace(/"$/gi, '');
    return v;
  });
  return stringParsed;
};

const objTypeParser = (arr) => {
  const objTypeParsed = arr.map((v, idx) => {
    if (arr[idx + 1] && arr[idx + 1].type === 'objSeparator') v['subType'] = 'propKey';
    if (arr[idx - 1] && arr[idx - 1].type === 'objSeparator') v['subType'] = 'propValue';
    return v;
  });
  return objTypeParsed;
};

const objSeparatorFilter = (arr) => arr.filter(({ type }) => type !== 'objSeparator');

const lexer = _.pipe(preLexer, stringParser, objTypeParser, objSeparatorFilter);
module.exports = lexer;
