const Parser = require("../lib/core/parser");

const wpiParser = new Parser();

describe("basic test", function () {
  it("collector should search all directories to find .js extension and return array of filename with path", async function () {
    const data = await wpiParser.collector();
    console.log(data);
    expect(data.length).toBeGreaterThan(0);
  });

  it("batcher should read all .js file and return array of string", function () {
    const data = wpiParser.batcher();
    expect(data).toStrictEqual([
      " * @wpiVersion 0.0.1 " +
        " * @wpiName 테스트입니다. " +
        " * @wpiDescription 테스트 디스크립션 " +
        " * @wpiRoute api/test [post] " +
        " * @wpiBody {string} name 이름 " +
        " * @wpiBody {string} nickname 별명 " +
        " * @wpiBody {string} password 비밀번호 " +
        " * @wpiSuccess {string} message 메세지 " +
        " * @wpiSuccess {int} statusCode 상태코드 " +
        " * @wpiSuccess {object} data 데이터 ",
    ]);
  });

  it("should return formatted return value", function () {
    const result = wpiParser.parse();
    expect(result).toStrictEqual({
      version: "0.0.1",
      name: "테스트입니다.",
      description: "테스트 디스크립션",
      route: "api/test",
      method: "post",
      body: [
        { key: "name", type: "string", explain: "이름" },
        { key: "nickname", type: "string", explain: "별명" },
        { key: "password", type: "string", explain: "비밀번호" },
      ],
      success: [
        { key: "message", type: "string", explain: "메세지" },
        { key: "statusCode", type: "int", explain: "상태코드" },
        { key: "data", type: "object", explain: "데이터" },
      ],
    });
  });
});
