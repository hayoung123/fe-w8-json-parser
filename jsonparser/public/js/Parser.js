import { isType } from "./checkType.js";

function makeNode({ type, value, subType }) {
  if (isType.array(type) || isType.object(type) || isType.init(type))
    return { type, child: [] };
  else if (isType.propKey(subType))
    return {
      value: { propKey: { type, value }, propValue: {} },
      type: "objectProperty",
    };
  else return { type, value };
}

const preParser = (arr, node) => {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (isType.open(value.subType)) {
      const parentNode = makeNode(value);
      const newNode = preParser(arr.slice(i + 1), parentNode);
      i += newNode.skipIndex;
      node.child.push(newNode.node);
    } else if (isType.close(value.subType)) {
      return { node, skipIndex: i + 1 };
    } else if (isType.propKey(value.subType)) {
      const nextValue = arr[i + 1];
      const objPropertyNode = makeNode(value);
      const objPropertyValueNode = makeNode(nextValue);
      //Object value가 배열 또는 객체일 경우에는 재귀돌려서 결과를 만들어낸다.
      if (isType.array(nextValue.type) || isType.object(nextValue.type)) {
        const newValueNode = preParser(arr.slice(i + 2), objPropertyValueNode);
        objPropertyNode.value.propValue = newValueNode.node;
        node.child.push(objPropertyNode);
        i += newValueNode.skipIndex + 1;
      } else {
        objPropertyNode.value.propValue = objPropertyValueNode;
        node.child.push(objPropertyNode);
        i += 1;
      } 
    } else {
      node.child.push(makeNode(value));
    }
  }
};

const parser = (arr) => {
  const initNode = makeNode({ type: "init" });
  preParser(arr, initNode);
  return initNode.child[0];
};

export default parser;
