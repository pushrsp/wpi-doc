const _elementRegex = {
  start: "(",
  wpiRoute: "(@wpiRoute)\\s(?<route>[^\\s]+)\\s([\\[](?<method>.+)[\\]])",
  end: ")",
};

function _objToString(obj) {
  let str = "";

  for (const key in obj) {
    str += obj[key];
  }

  return str;
}

class DO_NOT_TOUCH {
  static PWD = process.env.PWD;
  static batcherRegex = /\/\*\*\s\s\*\s@wpi([^*]|\*[^\/])+\*\//g;
  static elementRegex = new RegExp(_objToString(_elementRegex));
  static defineKeyRegex = /((@wpiDefineKey)\s(?<key>\w+))/;
  static defineValueRegex = /((@wpiDefineValue)\s(?<key>\w+)\s(\{(?<type>.+)\}))/;
}

module.exports = { DO_NOT_TOUCH };
