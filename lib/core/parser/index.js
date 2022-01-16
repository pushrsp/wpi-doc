const parseRoute = require("./route");

function _Parser() {
  this.result = { route: "", method: "", description: "", body: [], success: [], fail: [] };
}

_Parser.prototype.setAttribute = function (key, value) {
  this.result[key] = value;
};

_Parser.prototype.parseRoute = parseRoute;

module.exports = _Parser;
