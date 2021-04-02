import _ from "./utils.js";
import View from "./view.js";
import tokenizer from "./Tokenizer.js";
import lexer from "./Lexer.js";
import parser from "./Parser.js";

const input = _.$(".form-control");
const btn = _.$("button");
const view = new View(_.$(".tokenizer"), _.$(".lexer"), _.$(".parser"));
const clickHandler = () => {
  _.pipe(tokenizer, view.tokenizerRender.bind(view))(input.value);
  _.pipe(tokenizer, lexer, (data) => view.lexerRender(data))(input.value);
  _.pipe(tokenizer, lexer, parser, (data) => view.parserRender(data))(
    input.value
  );
};

_.on(btn, "click", () => clickHandler());
