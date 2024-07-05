const { pubsub } = require("../common/pubSub.js");
const { ask } = require("../common/askPromise.js");
const { wait } = require("../common/wait.js");
const { navigateArray } = require("./readArray.js");
require("./Notification.js");
const readline = require("readline");
const { GetAllPlayerComands } = require("./player.js");

const MAXTURN = 10;

// const Players = [{ name: "sam" }, { name: "ben" }, { name: "callum" }];

const GameLoop = async () => {
  await ask("Enter input to start ");
  pubsub.publish("start");

  let turn = 0;
  while (turn < MAXTURN) {
    turn++;
    console.log();
    console.log({ turn });

    const commands = await GetAllPlayerComands();
    // console.log(commands);
    commands.forEach((command) => {
      console.log(`${command.player.name} chooses ${command.command}`);
    });

    await wait(2000);

    // await navigateArray(["ass", "balls", "assballs"]);

    // if (turn >= MAXTURN) {
    //   pubsub.publish("max turn reached");
    //   break;
    // }
  }
  // process.exit();
};
GameLoop();
