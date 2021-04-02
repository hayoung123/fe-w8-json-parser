import _ from './utils.js';
import { is } from './checkType.js';

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
const isEndString = (stringStack, value) => value === stringStack[stringStack.length - 1];

const preTokenizer = (str) => {
  const stringStack = [];
  const tokenArray = str.split('').reduce((acc, cur, idx, arr) => {
    if (isStartString(stringStack, cur)) {
      stringStack.push(cur);
      acc.push(cur);
      return acc;
    } else if (isEndString(stringStack, cur, arr[idx + 1])) stringStack.pop();

    if (isStartValue(stringStack, cur, arr[idx - 1]) || isRealSign(stringStack, cur)) {
      if (is.comma(cur)) return acc;
      acc.push(cur);
    } else acc[acc.length - 1] += cur;

    return acc;
  }, []);
  if (stringStack.length) throw Error('짝퉁 스트링!');
  return tokenArray;
};
//양끝 공백 제거
const arraySpaceParser = (arr) => arr.map((v) => v.trim());
const blankParser = (arr) => arr.filter((v) => v !== '');
const tokenizer = _.pipe(preTokenizer, arraySpaceParser, blankParser);

export default tokenizer;
