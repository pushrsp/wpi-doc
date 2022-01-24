const { DO_NOT_TOUCH } = require("../utils/factory");
const { getValue } = require("../utils/register");

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

  execBody(element) {
    if (!DO_NOT_TOUCH.body.test(element)) return;

    const { type, key, explain } = DO_NOT_TOUCH.body.exec(element).groups;

    this.element.addBody({ key, type, explain, collapse: this._getCollapse(type) });
  }

  execSuccess(element) {
    if (!DO_NOT_TOUCH.success.test(element)) return;

    const { type, key, explain } = DO_NOT_TOUCH.success.exec(element).groups;

    this.element.addSuccess({ type, key, explain, collapse: this._getCollapse(type) });
  }

  execFail(element) {
    if (!DO_NOT_TOUCH.fail.test(element)) return;

    const { type, key, explain } = DO_NOT_TOUCH.fail.exec(element).groups;

    this.element.addFail({ type, key, explain, collapse: this._getCollapse(type) });
  }

  _getCollapse(type) {
    const collapse = {};
    type = type.split("|");

    if (type.length === 1 && getValue(type[0].trim())) {
      collapse[type[0].trim()] = getValue(type[0].trim());
    } else if (type.length > 1) {
      for (const embed of type) {
        collapse[embed.trim()] = getValue(embed.trim());
      }
    }

    return collapse;
  }

  getElement() {
    return this.element.build();
  }
}

module.exports = { ElementParser };
