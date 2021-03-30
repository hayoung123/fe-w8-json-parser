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
const tokenizer = (str) => {
  const stringStack = [];
  const tokenArray = str.split('').reduce((acc, cur, idx, arr) => {
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
