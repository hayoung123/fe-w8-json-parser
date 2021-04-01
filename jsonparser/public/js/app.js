import _ from "./utils.js";
import tokenizer from "./Tokenizer.js";
import lexer from "./Lexer.js";
import parser from "./Parser.js";

const jsonParser = _.pipe(tokenizer, lexer, parser);
const jsonlexer = _.pipe(tokenizer, lexer);
const jsontokenizer = _.pipe(tokenizer);

const input = _.$(".input");
const btn = _.$(".submit");
const $tokenizer = _.$(".tokenizer");
const $lexer = _.$(".lexer");
const $parser = _.$(".parser");

const clickHandler = () => {
  $tokenizer.innerHTML = JSON.stringify(jsontokenizer(input.value));
  $lexer.innerHTML = JSON.stringify(jsonlexer(input.value), null);
  $parser.textContent = JSON.stringify(jsonParser(input.value), null, 2);
};
_.on(btn, "click", () => clickHandler());
