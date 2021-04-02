import _ from "./utils.js";
import { isType } from "./checkType.js";
import tokenizer from "./Tokenizer.js";
import lexer from "./Lexer.js";
import parser from "./Parser.js";

const input = _.$(".form-control");

// export const clickHandler = () => {
//   $tokenizer.innerHTML = JSON.stringify(jsontokenizer(input.value));
//   $lexer.innerHTML = JSON.stringify(jsonlexer(input.value), null);
//   $parser.innerHTML = JSON.stringify(jsonParser(input.value), null, 2);
// };

// const jsonParser = _.pipe(tokenizer, lexer, parser);
// const jsonlexer = _.pipe(tokenizer, lexer);
// const jsontokenizer = _.pipe(tokenizer);

export default class View {
  constructor(token, lexer, parser) {
    this.$tokenizer = token;
    this.$lexer = lexer;
    this.$parser = parser;
  }

  tokenizerRender(data) {
    this.$tokenizer.innerHTML = JSON.stringify(data);
  }
  lexerRender(data) {
    this.$lexer.innerHTML = JSON.stringify(data, null, 2);
  }
  parserRender(data) {
    const count = this.numStrCount(data);
    this.$parser.innerHTML = `${JSON.stringify(data, null, 2)}

    배열 중첩 수준: ${this.arrayDepthCount(data)} 단계
    문자열 타입 개수 : ${count.strCnt} 개
    숫자 타입 개수 : ${count.numCnt} 개`;
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
      if (v.type === "objectProperty") {
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
