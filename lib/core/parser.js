"use strict";

const { DO_NOT_TOUCH } = require("../utils/factory");

const batcher = require("./batcher");
const collector = require("./collector");

function Parser() {
  this.result = [];
}

function _parse(elements) {
  for (const element of elements) {
    console.log(element);
  }
}

Parser.prototype.parse = function (batcher) {
  // console.log(batcher);

  for (const element of batcher) {
    _parse(element.split("\n"));
    // console.log(element.match(DO_NOT_TOUCH.route));
    // console.log(element.match(DO_NOT_TOUCH.description));
    // console.log(DO_NOT_TOUCH.body.exec(element));
  }
  return [
    {
      route: "api/test",
      method: "POST",
      description: "테스트 디스크립션",
      body: [
        { key: "name", type: "string", explain: "이름" },
        { key: "nickname", type: "string", explain: "별명" },
        { key: "password", type: "string", explain: "비밀번호" },
      ],
      success: [
        { key: "message", type: "string", explain: "메세지" },
        { key: "statusCode", type: "int", explain: "상태코드" },
        { key: "data", type: "object", explain: "데이터" },
      ],
    },
  ];
};

Parser.prototype.batcher = batcher;
Parser.prototype.collector = collector;

module.exports = Parser;
