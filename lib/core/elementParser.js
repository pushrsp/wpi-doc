const { DO_NOT_TOUCH } = require("../utils/factory");

class ElementParser {
  constructor() {}

  setElement(element) {
    this.element = element;
  }

  execRoute(element) {
    if (!DO_NOT_TOUCH.route.test(element)) return;

    const { route, method } = DO_NOT_TOUCH.route.exec(element).groups;

    this.element.addRoute(route);
    this.element.addMethod(method.toUpperCase());
  }

  execDescription(element) {
    if (!DO_NOT_TOUCH.description.test(element)) return;

    const { description } = DO_NOT_TOUCH.description.exec(element).groups;

    this.element.addDescription(description);
  }

  getElement() {
    return this.element.build();
  }
}

module.exports = { ElementParser };
