"use strict";

const fs = require("fs");

const { setValue, getValue } = require("../utils/register");
const { DO_NOT_TOUCH } = require("../utils/factory");

function _openFileAndPush(path) {
  return fs.readFileSync(path, { encoding: "utf-8" }).match(DO_NOT_TOUCH.batcherRegex);
}

function _setDefineProperty(key, content) {
  content = content.split("\n");

  const elements = [];
  let temp;
  for (const element of content) {
    if (DO_NOT_TOUCH.defineValueRegex.exec(element)) {
      temp = DO_NOT_TOUCH.defineValueRegex.exec(element);
      elements.push({ key: temp.groups.key, type: temp.groups.type.toUpperCase() });
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
      const defineKeyContents = DO_NOT_TOUCH.defineKeyRegex.exec(content);
      _setDefineProperty(defineKeyContents.groups.key, content);
    }
  }

  return result;
}

module.exports = batcher;
