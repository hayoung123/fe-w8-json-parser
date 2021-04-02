import _ from './utils.js';
import { clickHandler } from './view.js';
// import tokenizer from './Tokenizer.js';
// import lexer from './Lexer.js';
// import parser from './Parser.js';

const input = _.$('.form-control');
_.on(btn, 'click', () => clickHandler());

const tokenView = new TokenView();
const lexerView = new LexerView();
pipe(token, tokenView.render)(input.value);
pipe(token, lexer, new LexerView());
pipe(token, lexer, parser, new View());
