class DO_NOT_TOUCH {
  static PWD = process.env.PWD;
  static batcherRegex = /\/\*\*\s\s\*\s@wpi([^*]|\*[^\/])+\*\//g;
  static defineKeyRegex = /((@wpiDefineKey)\s(?<key>\w+))/;
  static defineValueRegex = /((@wpiDefineValue)\s(?<key>\w+)\s(\{(?<type>.+)\}))/;
  static route = /@wpiRoute\s(?<route>[^\s]+)\s([\[](?<method>.+)[\]])/;
  static description = /@wpiDescription\s(?<description>[^\s]+)/;
  static body = /@wpiBody\s(?<type>{.+})\s(?<key>[a-zA-Z0-9]+)\s(?<explain>[^\s]+)/;
}

module.exports = { DO_NOT_TOUCH };
