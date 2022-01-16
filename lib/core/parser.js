"use strict";

const { DO_NOT_TOUCH } = require("../utils/factory");

const batcher = require("./batcher");
const collector = require("./collector");

const _Parser = require("./parser/index");

function Parser() {
  this.result = [];
}

function _parse(elements) {
  const result = {
    route: "",
    method: "",
    description: "",
    body: [],
    success: [],
    fail: [],
  };

  for (const element of elements) {
    const parser = new _Parser();
    parser.parseRoute(element);
  }
}

Parser.prototype.parse = function (batcher) {
  const result = [];

  for (const element of batcher) {
    _parse(element.split("\n"));
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
