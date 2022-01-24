class ElementModel {
  constructor() {
    this.element = {};
  }

  addRoute(route) {
    if (route) {
      this.element.route = route;
    }
  }

  addMethod(method) {
    if (method) {
      this.element.method = method;
    }
  }

  addDescription(description) {
    if (description) {
      this.element.description = description;
    }
  }

  addBody(body) {
    if (!this.element.body) this.element.body = [];

    this.element.body.push(body);
  }

  addSuccess(success) {
    if (!this.element.success) this.element.success = [];

    this.element.success.push(success);
  }

  addFail(success) {
    if (!this.element.fail) this.element.fail = [];

    this.element.fail.push(success);
  }

  build() {
    return this.element;
  }
}

module.exports = { ElementModel };
