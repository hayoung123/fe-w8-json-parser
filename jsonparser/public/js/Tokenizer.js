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
const isStartString = (stringStack, value, preValue) =>
  stringStack.length && isStringSign(value) && preValue !== `\\`;
const tokenizer = (str) => {
  const stringStack = [];
  const tokenArray = str.split('').reduce((acc, cur, idx, arr) => {
    if (!stringStack.length && isStringSign(cur)) stringStack.push(cur);
    else if (cur === stringStack[stringStack.length - 1]) stringStack.pop();
    if (
      isStartString(stringStack, cur, arr[idx - 1]) ||
      isRealSign(stringStack, cur) ||
      isStartValue(stringStack, cur, arr[idx - 1])
    )
      acc.push(cur);
    else acc[acc.length - 1] += cur;
    return acc;
  }, []);
  return tokenArray;
};
// console.log(tokenizer(`[1]`));
// console.log(tokenizer(`[1,2]`));
// console.log(tokenizer(`[1,23,'hello']`));
// console.log(tokenizer(`{a:1,b:2}`));
//console.log(tokenizer(`[{a:1,b:2},{a:1,b:2}]`));
// console.log(tokenizer(`['eam[',o,"]n"]`));
//console.log(tokenizer(`[{hello:[1,2],b:2},{a:'eam[o]n',b:2}]`));
console.log(tokenizer(`["hel\'l\'o"]`));
console.log(tokenizer(`["hel'lo"]`));
