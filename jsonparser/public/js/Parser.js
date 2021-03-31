function makeNode({ type, value, subType }) {
  if (type === 'Array' || type === 'Object' || type === 'init') return { type, child: [] };
  else if (subType === 'propKey')
    return { value: { propKey: { type, value }, propValue: {} }, type: 'objectProperty' };
  else return { type, value };
}

const preParser = (arr, node) => {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    switch (value.subType) {
      case 'open':
        const parentNode = makeNode(value);
        const newNode = preParser(arr.slice(i + 1), parentNode);
        i += newNode.skipIndex;
        node.child.push(newNode.node);
        break;
      case 'close':
        return { node, skipIndex: i + 1 };
      case 'propKey':
        const nextValue = arr[i + 1];
        const objNode = makeNode(value);
        const objProperyValueNode = makeNode(nextValue); //{type:array, child : []}
        if (nextValue.type === 'Array' || nextValue.type === 'Object') {
          const newValueNode = preParser(arr.slice(i + 2), objProperyValueNode);
          objNode.value.propValue = newValueNode.node;
          node.child.push(objNode);
          i += newValueNode.skipIndex;
        } else {
          objNode.value.propValue = objProperyValueNode;
          node.child.push(objNode);
          i += 1;
        }
        break;
      default:
        node.child.push(makeNode(value));
    }
  }
};

const parser = (arr) => {
  const initNode = makeNode({ type: 'init' });
  preParser(arr, initNode);
  return initNode.child;
};

module.exports = parser;
