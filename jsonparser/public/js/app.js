const _ = require('./utils.js');
const tokenizer = require('./Tokenizer.js');
const lexer = require('./Lexer.js');
const parser = require('./Parser.js');

const jsonParser = _.pipe(tokenizer);

console.dir(jsonParser('["a",  [\'3\',4]]'), { depth: null });
