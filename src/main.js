const Listr = require("listr");
const clc = require("cli-color");
const fs = require("fs");

const Parser = require("../lib/core/parser");

module.exports.execJob = async function (answer) {
  if (!answer.check) return;

  const tasks = new Listr([
    {
      title: "Parsing",
      task: async () => {
        try {
          const wpiParser = new Parser();

          const paths = await wpiParser.collector();
          const batcher = wpiParser.batcher(paths);
          const result = wpiParser.parse(batcher);
          fs.writeFileSync(`${answer.fileName}.json`, JSON.stringify(result, null, 2));

          return "Done";
        } catch (e) {
          process.exit(1);
          console.error(clc.red.bold("[ERROR] "), e);
        }
      },
    },
  ]);

  await tasks.run();

  console.log(clc.green.bold("[DONE]"), `${process.cwd()}/${answer.fileName}.json`);
};
