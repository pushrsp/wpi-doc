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
    if (DO_NOT_TOUCH.defineKeyRegex.exec(element)) continue;
    elementParser.setElement(new ElementModel());

    for (const _element of element.split("\n")) {
      elementParser.execRoute(_element);
      elementParser.execDescription(_element);
      elementParser.execParam(_element);
      elementParser.execQuery(_element);
      elementParser.execBody(_element);
      elementParser.execSuccess(_element);
      elementParser.execFail(_element);
    }

    this.result.push(elementParser.getElement());
  }

  return this.result;
};

Parser.prototype.batcher = batcher;
Parser.prototype.collector = collector;

module.exports = Parser;
