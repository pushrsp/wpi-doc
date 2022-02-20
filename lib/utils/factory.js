class DO_NOT_TOUCH {
  static PWD = process.cwd();
  static batcherRegex = /\/\*\*\s+\*\s@wpi([^*]|\*[^\/])+\*\//g;
  static defineKeyRegex = /@wpiDefineKey\s(?<key>\w+)/;
  static defineValueRegex = /@wpiDefineValue\s(\{(?<type>.+)\})\s(?<key>[a-zA-Z0-9]+)\s(?<explain>[^\s].*)/;
  static route = /@wpiRoute\s(?<route>[^\s]+)\s([\[](?<method>.+)[\]])/;
  static description = /@wpiDescription\s(?<description>[^\s].+)/;
  static body = /@wpiBody\s(\{(?<type>.+)\})\s(?<key>\w+)\s(?<explain>[^\s].*)/;
  static param = /@wpiParam\s(\{(?<type>.+)\})\s(?<key>\w+)\s(?<explain>[^\s].*)/;
  static query = /@wpiQuery\s(\{(?<type>.+)\})\s(?<key>\w+)\s(?<explain>[^\s].*)/;
  static success = /@wpiSuccess\s(\{(?<type>.+)\})\s(?<key>\w+)\s(?<explain>[^\s].*)/;
  static fail = /@wpiFail\s(\{(?<type>.+)\})\s(?<key>\w+)\s(?<explain>[^\s].*)/;
}

module.exports = { DO_NOT_TOUCH };
