const fs = require("fs");

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

    expect(data.length).toBeGreaterThan(0);
  });

  it("batcher should not search any keyword except comment", async function () {
    const paths = await wpiParser.collector();
    const batcher = wpiParser.batcher(["/Users/pushrsp/Desktop/projects/wpi-doc/case/store/store.route.js"]);
    expect(batcher.length).toBeGreaterThan(0);
  });

  it("should return formatted return value", async function () {
    const paths = await wpiParser.collector();
    const batcher = wpiParser.batcher(["/Users/pushrsp/Desktop/projects/wpi-doc/case/embed.case.js"]);
    const result = wpiParser.parse(batcher);
    // console.log(result);
    // expect(result.length).toBeGreaterThan(0);
    // console.log(JSON.stringify(result));
    fs.writeFileSync("wpi.json", JSON.stringify(result, null, 2));
  });
});
