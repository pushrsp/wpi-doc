const Parser = require("../lib/core/parser");

const { getValue } = require("../lib/utils/register");
const { DO_NOT_TOUCH } = require("../lib/utils/factory");

const wpiParser = new Parser();

describe("basic test", function () {
  it("collector should search all directories to find .js extension and return array of filename with path", async function () {
    const data = await wpiParser.collector();
    expect(data.length).toBeGreaterThan(0);
  });

  it("batcher should read all .js file and return array of string", function () {
    const data = wpiParser.batcher([`${DO_NOT_TOUCH.PWD}/case/base.case.js`]);

    expect(data.length).toBeGreaterThan(0);
  });

  it("batcher should not search any keyword except comment", async function () {
    const paths = await wpiParser.collector();
    const batcher = wpiParser.batcher(paths);
    expect(batcher.length).toBeGreaterThan(0);
    expect(getValue("address").length).toBeGreaterThan(0);
  });

  it("should return formatted return value", async function () {
    const paths = await wpiParser.collector();
    const batcher = wpiParser.batcher(paths);
    const result = wpiParser.parse(batcher);
    expect(result).toStrictEqual([
      {
        route: "api/test",
        method: "POST",
        description: "테스트 디스크립션",
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
    ]);
  });
});
