"use strict";

const batcher = require("./batcher");
const collector = require("./collector");

function Parser() {}

Parser.prototype.parse = function () {
  return {
    version: "0.0.1",
    name: "테스트입니다.",
    description: "테스트 디스크립션",
    result: [
      {
        route: "api/test",
        method: "post",
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
    ],
  };
};

Parser.prototype.batcher = batcher;
Parser.prototype.collector = collector;

module.exports = Parser;
