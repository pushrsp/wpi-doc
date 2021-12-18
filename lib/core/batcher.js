"use strict";

const fs = require("fs");

const { DO_NOT_TOUCH } = require("../utils/factory");

function _openFileAndPush(path) {
  return fs.readFileSync(path, { encoding: "utf-8" }).match(DO_NOT_TOUCH.batcherRegex);
}

function batcher([...args]) {
  let batcherGroup = [];

  for (const path of args) {
    batcherGroup = batcherGroup.concat(_openFileAndPush(path));
  }

  return batcherGroup.filter((el) => el !== null);
}

module.exports = batcher;
