const arrayDepthCount = (json, cnt = 0, cntArr = []) => {
  if (!json.child || json.type === "Object") return;
  
  cnt += 1;
  cntArr.push(cnt);
  json.child.forEach((v) => {
    arrayDepthCount(v, cnt, cntArr);
  });

  return Math.max(...cntArr);
};




