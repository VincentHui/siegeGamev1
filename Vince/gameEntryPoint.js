const { pubsub } = require("../common/pubSub.js");
const { ask } = require("../common/askPromise.js");
const { wait } = require("../common/wait.js");
const { navigateArray } = require("./readArray.js");
require("./Notification.js");
const { GetAllPlayerComands } = require("./player.js");
const { resetText } = require("../common/colors.js");

const MAXTURN = 10;

const GameLoop = async () => {
  await ask("Enter input to start ");
  pubsub.publish("start");

  let turn = 0;
  while (turn < MAXTURN) {
    turn++;
    console.log();
    console.log({ turn });

    const commands = await GetAllPlayerComands();
    console.log();
    for (cmd of commands) {
      console.log(
        `${cmd.player.color}${cmd.player.name} chooses ${cmd.command.name}${resetText}`
      );
      await cmd.command.effect(cmd.player);
      await wait(1000);
    }

    await wait(2000);

    if (turn >= MAXTURN) {
      pubsub.publish("max turn reached");
      process.exit();
    }
  }
};
GameLoop();
