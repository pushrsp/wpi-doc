"use strict";

const { DO_NOT_TOUCH } = require("../utils/factory");
const { ElementParser } = require("./elementParser");
const { ElementModel } = require("../model/element.model");

const batcher = require("./batcher");
const collector = require("./collector");

function Parser() {
  this.result = [];
}

Parser.prototype.parse = function (batcher) {
  const elementParser = new ElementParser();

  for (const element of batcher) {
    elementParser.setElement(new ElementModel());

    for (const _element of element.split("\n")) {
      elementParser.execRoute(_element);
      elementParser.execDescription(_element);
    }

    console.log(elementParser.getElement());
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
