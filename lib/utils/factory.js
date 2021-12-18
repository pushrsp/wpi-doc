class DO_NOT_TOUCH {
  static PWD = process.env.PWD;
  // static batcherRegex = /[*].+[@wpi].+/g;
  static batcherRegex = /\/\*[^*]*\*+(?:[^/*][^*][^]*\*+)*\/[^"]/g;
}

module.exports = { DO_NOT_TOUCH };
