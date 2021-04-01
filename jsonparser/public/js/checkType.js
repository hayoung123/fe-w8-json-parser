const is = {
  openArray(value) {
    return value === '[';
  },
  closeArray(value) {
    return value === ']';
  },
  openObject(value) {
    return value === '{';
  },
  closeObject(value) {
    return value === '}';
  },
  colon(value) {
    return value === ':';
  },
  comma(value) {
    return value === ',';
  },
  null(value) {
    return value === 'null' || value === 'NULL';
  },
  number(value) {
    return !isNaN(parseInt(value));
  },
  string(value) {
    return value[0] === '"' || value[0] === "'";
  },
  boolean(value) {
    return value === 'true' || value === 'false';
  },
  undefined(value) {
    return value === 'undefined';
  },
  objSeparator(value) {
    return value === ':';
  },
};

const isType = {
  init(type) {
    return type === 'init';
  },
  open(type) {
    return type === 'open';
  },
  close(type) {
    return type === 'close';
  },
  propKey(type) {
    return type === 'propKey';
  },
  array(type) {
    return type === 'Array';
  },
  object(type) {
    return type === 'Obejct';
  },
  number(type) {
    return type === 'Number';
  },
  string(type) {
    return type === 'String';
  },
  boolean(type) {
    return type === 'Boolean';
  },
  objSeparator(value) {
    return value === 'objSeparator';
  },
  propKey(value) {
    return value === 'propKey';
  },
};

module.exports = { is, isType };
