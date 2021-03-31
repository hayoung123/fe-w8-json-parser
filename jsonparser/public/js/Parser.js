const Node = ({ type, value }) => {
  if (type === 'init') return { type: 'init', child: [] };
  else if (type === 'openArray') return { type: 'array', child: [] };
  else return { type, value };
};

const preParser = (arr, node, prevNode) => {
  if (!arr.length) return;
  const curValue = arr.shift();
  switch (curValue.type) {
    case 'openArray':
      const arrayNode = Node(curValue);
      node.child.push(arrayNode);
      preParser(arr, arrayNode, node);
      preParser(arr, node, prevNode);
      break;
    case 'closeArray':
      return;
    default:
      const valueNode = Node(curValue);
      node.child.push(valueNode);
      preParser(arr, node, prevNode);
      break;
  }
};

const preParser = (arr, node) => {
  if (!arr.length) return;
  const curValue = arr.shift();
  switch (curValue.type) {
    case 'openArray':
      const arrayNode = Node(curValue);
      const newNode = preParser(arr, arrayNode);
      node.child.push(newNode);
      preParser(arr, node);
      break;
    case 'closeArray':
      return node;
    default:
      const valueNode = Node(curValue);
      node.child.push(valueNode);
      preParser(arr, node);
      return node;
  }
};

const preParser = (arr, node) => {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    switch (value.type) {
      case 'openArray':
        const arrayNode = Node(value);
        const newNode = preParser(arr.slice(i + 1), arrayNode);
        i += newNode.idx + 1;
        node.child.push(newNode.node);
        break;
      case 'closeArray':
        return { node, idx: i };
      default:
        node.child.push(Node(value));
    }
  }
};

const parser = (arr) => {
  const initNode = Node({ type: 'init' });
  preParser(arr, initNode);
  return initNode.child;
};

// module.exports = parser;

const test = [
  { type: 'openArray', value: '[' },
  { type: 'Number', value: '1' },
  { type: 'openArray', value: '[' },
  { type: 'Number', value: '2' },
  { type: 'openArray', value: '[' },
  { type: 'Number', value: '2' },
  { type: 'openArray', value: '[' },
  { type: 'Number', value: '2' },
  { type: 'closeArray', value: ']' },
  { type: 'Number', value: '3' },
  { type: 'closeArray', value: ']' },
  { type: 'Number', value: '1' },
  { type: 'closeArray', value: ']' },
  { type: 'Number', value: '2' },
  { type: 'closeArray', value: ']' },
];

// [1, [2, [2, [2], 3], 1], 2];
console.dir(parser(test), { depth: null });
