const _ = require('./utils.js');
const tokenizer = require('./Tokenizer.js');
const lexer = require('./Lexer.js');
const parser = require('./Parser.js');

const jsonParser = _.pipe(tokenizer, lexer);

console.dir(jsonParser("[\"a\",['b','c']]"), { depth: null });
