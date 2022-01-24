"use strict";

const fs = require("fs");

const { setValue, getValue } = require("../utils/register");
const { DO_NOT_TOUCH } = require("../utils/factory");

function _openFileAndPush(path) {
  return fs.readFileSync(path, { encoding: "utf-8" }).match(DO_NOT_TOUCH.batcherRegex);
}

function _setDefineProperty(key, content) {
  const elements = [];
  let temp;
  for (const element of content.split("\n")) {
    if (DO_NOT_TOUCH.defineValueRegex.exec(element)) {
      temp = DO_NOT_TOUCH.defineValueRegex.exec(element).groups;
      elements.push({
        key: temp.key,
        type: temp.type,
        explain: temp.explain,
      });
    }
  }

  setValue(key, elements);
}

function batcher([...args]) {
  let batcherGroup = [];

  for (const path of args) {
    batcherGroup = batcherGroup.concat(_openFileAndPush(path));
  }

  const result = [];
  for (const content of batcherGroup) {
    if (!content) continue;
    result.push(content);

    if (DO_NOT_TOUCH.defineKeyRegex.exec(content)) {
      const { key } = DO_NOT_TOUCH.defineKeyRegex.exec(content).groups;
      _setDefineProperty(key, content);
    }
  }

  return result;
}

module.exports = batcher;
