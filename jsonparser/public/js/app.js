const _ = require("./utils.js");
const tokenizer = require("./Tokenizer.js");
const lexer = require("./Lexer.js");
const parser = require("./Parser.js");

const jsonParser = _.pipe(tokenizer, lexer, parser);

console.dir(jsonParser('["[name]hello",123,{a:1,b:[1,2,3]}]'), { depth: null });
