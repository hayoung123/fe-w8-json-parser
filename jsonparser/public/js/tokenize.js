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

const tokenizer = (str) => {
  const tokenArray = str.split('').reduce((acc, cur, idx, arr) => {
    if (isSign(cur) || isSign(arr[idx - 1])) acc.push(cur);
    else acc[acc.length - 1] += cur;

    return acc;
  }, []);

  return tokenArray;
};
console.log(testTokenizer(`[1]`));
console.log(testTokenizer(`[1,2]`));
console.log(testTokenizer(`[1,23,'hello']`));
console.log(testTokenizer(`{a:1,b:2}`));
console.log(testTokenizer(`[{a:1,b:2},{a:1,b:2}]`));
console.log(testTokenizer(`[{a:[1,2],b:2},{a:1,b:2}]`));
