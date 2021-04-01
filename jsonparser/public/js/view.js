import { is, isType } from('./checkType.js');

const arrayDepthCount = (json, cnt = 0, cntArr = []) => {
  if (!json.child || isType.object(json.type)) return;

  cnt += 1;
  cntArr.push(cnt);
  json.child.forEach((v) => {
    arrayDepthCount(v, cnt, cntArr);
  });

  return Math.max(...cntArr);
};

const numStrCount = (json, numCnt = 0, strCnt = 0) => {
  if (!json.child) return { numCnt, strCnt };
  const childList = json.child;

  childList.forEach((v) => {
    let checkValue;
    if (v.type === 'objectProperty') {
      strCnt++; //key타입 더해주기
      checkValue = v.value.propValue;
    } else {
      checkValue = v;
    }
    if (isType.number(checkValue.type)) numCnt++;
    if (isType.string(checkValue.type)) strCnt++;
    const stackCount = numStrCount(checkValue, numCnt, strCnt);
    numCnt += stackCount.numCnt - numCnt;
    strCnt += stackCount.strCnt - strCnt;
  });
  return { numCnt, strCnt };
};

