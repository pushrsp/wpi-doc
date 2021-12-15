"use strict";

const { readdir } = require("fs").promises;
const path = require("path");

const { DO_NOT_TOUCH } = require("../utils/factory");

function _getExtension(filename) {
  const ext = path.extname(filename || "").split(".");
  return ext[ext.length - 1];
}

async function _searchJSFile(dir) {
  const list = await readdir(dir, { withFileTypes: true });

  const promiseGroup = [];
  for (const el of list) {
    const res = path.resolve(dir, el.name);
    if (res.includes("node_modules")) continue;

    if (el.isDirectory()) {
      promiseGroup.push(_searchJSFile(res));
    } else if (el.isFile() && _getExtension(el.name) === "js") {
      promiseGroup.push(res);
    }
  }

  return await Promise.all(promiseGroup);
}

async function collector() {
  return await _searchJSFile(DO_NOT_TOUCH.PWD);
}

module.exports = collector;
