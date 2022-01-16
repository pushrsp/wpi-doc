const { DO_NOT_TOUCH } = require("../../utils/factory");

function parseRoute(element) {
  if (!DO_NOT_TOUCH.route.test(element)) return;

  const { route, method } = DO_NOT_TOUCH.route.exec(element).groups;

  this.setAttribute("route", route);
  this.setAttribute("method", method);
}

module.exports = parseRoute;
