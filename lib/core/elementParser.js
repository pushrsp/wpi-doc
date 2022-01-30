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

    this.element.addBody({ key, type, explain, collapse: this._getCollapse(type, key) });
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

  _getCollapse(type, key) {
    const collapse = {};
    type = type.split("|");
    if (type.length === 1 && !getValue(type[0].trim())) {
      return collapse;
    }

    if (type.length === 1 && getValue(type[0].trim())) {
      collapse[key.trim()] = [];
      this._searchItem(collapse[key], type[0].trim());
    } else {
      for (const _type of type) {
        if (getValue(_type.trim())) {
          collapse[_type.trim()] = [];
          this._searchItem(collapse[_type.trim()], _type.trim());
        }
      }
    }

    return collapse;
  }

  _searchItem(collapse, type) {
    // console.log(collapse);
    for (const item of getValue(type)) {
      item.collapse = this._getEmbed(item);
      // console.log(item);
      collapse.push(item);
    }
  }

  _getEmbed(item) {
    if (!getValue(item.type.trim())) {
      return {};
    }

    const collapse = { [item.key.trim()]: [] };

    for (const _item of getValue(item.type.trim())) {
      if (getValue(_item.type.trim())) {
        _item.collapse = this._getEmbed(_item);
        collapse[item.key.trim()].push(_item);
      } else {
        collapse[item.key.trim()].push(_item);
      }
    }

    return collapse;
  }

  getElement() {
    return this.element.build();
  }
}

module.exports = { ElementParser };
