function makeNode({ type, value }) {
  if (type === 'Array' || type === 'Object' || type === 'init') return { type, child: [] };
  else return { type, value };
}

const preParser = (arr, node) => {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    switch (value.subType) {
      case 'open':
        const arrayNode = makeNode(value);
        const newNode = preParser(arr.slice(i + 1), arrayNode);
        i += newNode.idx + 1;
        node.child.push(newNode.node);
        break;
      case 'close':
        return { node, idx: i };
      case 'propsKey':
        //1. 전체 껍때기 만들기{value:{propKey,propValue},"type": "objectProperty"}
        //2. propKey에 stringKey넣기
        //3. valueNode = i+1 propvalue 만들기 {type,~~~}
        //4-1. value가 array 또는 obejct이면 => newValueNode = preParser(arr.slice(i+2),valueNode)
        //4-1. propvalue =newValueNode.node  인덱스 = 인덱스 + newValueNode.idx
        //4-2. 아니면 => propValue = valueNode
        //4-2. 인덱스 +1
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

// module.exports = parser;

const test = [
  { type: 'Array', value: '[', subType: 'open' },
  { type: 'Number', value: '1', subType: undefined },
  { type: 'Array', value: '[', subType: 'open' },
  { type: 'Number', value: '2', subType: undefined },
  { type: 'Number', value: '3', subType: undefined },
  { type: 'Array', value: ']', subType: 'close' },
  { type: 'Array', value: ']', subType: 'close' },
];

console.dir(parser(test), { depth: null });
