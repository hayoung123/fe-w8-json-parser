const _ = require('./utils.js');
const { is } = require('./checkType.js');

const isSign = (value) => {
  return (
    is.openArray(value) ||
    is.closeArray(value) ||
    is.openObject(value) ||
    is.closeObject(value) ||
    is.comma(value) ||
    is.colon(value)
  );
};
//스트링 따옴표인지 확인
const isStringSign = (value) => value === "'" || value === '"';
//문자열에 포함되지 않는 구분자인지 확인
const isRealSign = (stringStack, value) => !stringStack.length && isSign(value);
//구분자가 아닌 값인지 확인
const isStartValue = (stringStack, value, preValue) =>
  !stringStack.length && isSign(preValue) && !isStringSign(value);
//스트링 시작하는 따옴표인지 확인
const isStartString = (stringStack, value) => !stringStack.length && isStringSign(value);
//스트링 끝나는 따옴표인지 확인
const isEndString = (stringStack, value, nextValue) =>
  value === stringStack[stringStack.length - 1] && isSign(nextValue);

const preTokenizer = (str) => {
  const stringStack = [];
  const tokenArray = str.split('').reduce((acc, cur, idx, arr) => {
    if (cur === ',') return acc;
    if (isStartString(stringStack, cur)) {
      stringStack.push(cur);
      acc.push(cur);
      return acc;
    } else if (isEndString(stringStack, cur, arr[idx + 1])) stringStack.pop();

    if (isStartValue(stringStack, cur, arr[idx - 1]) || isRealSign(stringStack, cur)) acc.push(cur);
    else acc[acc.length - 1] += cur;

    return acc;
  }, []);
  return tokenArray;
};
//양끝 공백 제거
const arraySpaceParser = (arr) => arr.map((v) => v.trim());
const quotesParser = (value) => {
  if (value[0] === "'" && value[value.length - 1] === "'") {
    value = value.slice(1, value.length - 1);
    return '"' + value + '"';
  }
  return value;
};
//문자열 양끝 따옴표 ' => "
const arrayQuotesParser = (arr) => arr.map(quotesParser);
//빈 공백 제거
const blankFilter = (arr) => arr.filter((v) => v !== '');

const tokenizer = _.pipe(preTokenizer, arraySpaceParser, arrayQuotesParser, blankFilter);

module.exports = tokenizer;
