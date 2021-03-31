const _ = require('./utils.js');
const lexer = require('./Lexer.js');
const parser = require('./Parser.js');
const isSign = (value) => {
  return (
    value === '[' ||
    value === ',' ||
    value === ']' ||
    value === '{' ||
    value === '}' ||
    value === ':'
  );
};
const isStringSign = (value) => value === "'" || value === '"';
const isRealSign = (stringStack, value) => !stringStack.length && isSign(value);
const isStartValue = (stringStack, value, preValue) =>
  !stringStack.length && isSign(preValue) && !isStringSign(value);
const isStartString = (stringStack, value) => !stringStack.length && isStringSign(value);
const isEndString = (stringStack, value) => value === stringStack[stringStack.length - 1];
const arraySpaceParser = (arr) => arr.map((v) => v.trim());

const arrayQuotesParser = (arr) => arr.map(quotesParser);

const quotesParser = (value) => {
  if (value[0] === "'" && value[value.length - 1] === "'") {
    value = value
      .split('')
      .slice(1, value.length - 1)
      .join('');
    return '"' + value + '"';
  }
  return value;
};

const preTokenizer = (str) => {
  const stringStack = [];
  const tokenArray = str.split('').reduce((acc, cur, idx, arr) => {
    if (cur === ',') return acc;
    if (isStartString(stringStack, cur)) {
      stringStack.push(cur);
      acc.push(cur);
      return acc;
    } else if (isEndString(stringStack, cur)) stringStack.pop();

    if (isStartValue(stringStack, cur, arr[idx - 1]) || isRealSign(stringStack, cur)) acc.push(cur);
    else acc[acc.length - 1] += cur;

    return acc;
  }, []);
  return tokenArray;
};

const blankFilter = (arr) => arr.filter((v) => v !== '');

const tokenizer = _.pipe(preTokenizer, arraySpaceParser, arrayQuotesParser, blankFilter);

module.exports = tokenizer;

const main = _.pipe(tokenizer, lexer, parser);

console.dir(
  main(
    '["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]'
  ),
  { depth: null }
);
