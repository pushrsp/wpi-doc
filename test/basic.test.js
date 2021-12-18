const Parser = require("../lib/core/parser");
const { DO_NOT_TOUCH } = require("../lib/utils/factory");

const wpiParser = new Parser();

describe("basic test", function () {
  it("collector should search all directories to find .js extension and return array of filename with path", async function () {
    const data = await wpiParser.collector();
    expect(data.length).toBeGreaterThan(0);
  });

  it("batcher should read all .js file and return array of string", function () {
    const data = wpiParser.batcher([`${DO_NOT_TOUCH.PWD}/case/base.case.js`]);
    expect(data).toStrictEqual([
      "/**\n" +
        " * @wpiVersion 0.0.1\n" +
        " * @wpiName 테스트입니다.\n" +
        " * @wpiDescription 테스트 디스크립션\n" +
        " * @wpiRoute api/test [post]\n" +
        " * @wpiBody {string} name 이름\n" +
        " * @wpiBody {string} nickname 별명\n" +
        " * @wpiBody {string} password 비밀번호\n" +
        " * @wpiSuccess {string} message 메세지\n" +
        " * @wpiSuccess {int} statusCode 상태코드\n" +
        " * @wpiSuccess {object} data 데이터\n" +
        " */\n" +
        "\n" +
        "/**\n" +
        " * @wpiVersion 0.0.2\n" +
        " * @wpiName 두번제 테스트\n" +
        " * @wpiRoute api/test2 [get]\n" +
        " * @wpiBody {string} name 이름\n" +
        " * @wpiBody {string} nickname 별명\n" +
        " * @wpiBody {string} password 비밀번호\n" +
        " * @wpiSuccess {string} message 메세지\n" +
        " * @wpiSuccess {int} statusCode 상태코드\n" +
        " * @wpiSuccess {object} data 데이터\n" +
        " */\n",
    ]);
  });

  it("batcher should not search any keyword except comment", async function () {
    const paths = await wpiParser.collector();
    const batcher = wpiParser.batcher(paths);
    expect(batcher.length).toBeGreaterThan(0);
  });

  it("should return formatted return value", function () {
    const result = wpiParser.parse();
    expect(result).toStrictEqual({
      version: "0.0.1",
      name: "테스트입니다.",
      description: "테스트 디스크립션",
      result: [
        {
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
        },
      ],
    });
  });
});
