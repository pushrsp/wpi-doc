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

  build() {
    return this.element;
  }
}

module.exports = { ElementModel };
