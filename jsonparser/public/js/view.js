import _ from './utils.js';
import { isType } from './checkType.js';
import tokenizer from './Tokenizer.js';
import lexer from './Lexer.js';
import parser from './Parser.js';

const input = _.$('.form-control');

export const clickHandler = () => {
  $tokenizer.innerHTML = JSON.stringify(jsontokenizer(input.value));
  $lexer.innerHTML = JSON.stringify(jsonlexer(input.value), null);
  $parser.innerHTML = JSON.stringify(jsonParser(input.value), null, 2);
};

const jsonParser = _.pipe(tokenizer, lexer, parser);
const jsonlexer = _.pipe(tokenizer, lexer);
const jsontokenizer = _.pipe(tokenizer);

class TokenView {
  constructor() {}
  init() {
    this.$tokenizer = _.$('.tokenizer');
    this.render();
  }
  render(data) {
    this.$tokenizer.innerHTML = JSON.stringify(data);
  }
}
class LexerView {
  constructor(parsedData) {}
  init() {
    this.$lexer = _.$('.lexer');
    this.render();
  }
  render(data) {}
}
class ParserView {
  constructor(parsedData) {}
  init() {
    this.$parser = _.$('.parser');
    this.render();
  }
  render(data) {
    //if(배열이고 [0] 스트링이라면) 토큰
    //if(배열이고 [0] 객체)  렉서
    //if(객체라면) 파서
  }
  arrayDepthCount(json, cnt = 0, cntArr = []) {
    if (!json.child || isType.object(json.type)) return;
    cnt += 1;
    cntArr.push(cnt);
    json.child.forEach((v) => {
      this.arrayDepthCount(v, cnt, cntArr);
    });
    return Math.max(...cntArr);
  }

  numStrCount(json, numCnt = 0, strCnt = 0) {
    if (!json.child) return { numCnt, strCnt };
    const childList = json.child;
    childList.forEach((v) => {
      let checkValue;
      if (v.type === 'objectProperty') {
        strCnt++; //key타입 더해주기
        checkValue = v.value.propValue;
      } else {
        checkValue = v;
      }
      if (isType.number(checkValue.type)) numCnt++;
      if (isType.string(checkValue.type)) strCnt++;
      const stackCount = this.numStrCount(checkValue, numCnt, strCnt);
      numCnt += stackCount.numCnt - numCnt;
      strCnt += stackCount.strCnt - strCnt;
    });
    return { numCnt, strCnt };
  }
}
