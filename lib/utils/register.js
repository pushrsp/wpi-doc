const store = new Map();

function getValue(key) {
  return store.get(key);
}

function setValue(key, value) {
  store.set(key, value);
}

module.exports = { getValue, setValue };
