const { pubsub } = require("../common/pubSub.js");
const { ask } = require("../common/askPromise.js");
const { wait } = require("../common/wait.js");
require("./Notification.js");
const { GetAllPlayerComands } = require("./player.js");
const {
  resetText,
  redText,
  BasicBlue,
  yellowText,
} = require("../common/colors.js");
const { startLoader } = require("../common/loader.js");

const MAXTURN = 10;

let Players = [
  { name: "sam", color: redText, ai: true, bullets: 1, health: 2 },
  { name: "ben", color: BasicBlue, ai: true, bullets: 1, health: 2 },
  { name: "callum", color: yellowText, ai: true, bullets: 1, health: 2 },
];

const GameLoop = async () => {
  await ask("Enter input to start ");
  await startLoader(3000);
  pubsub.publish("start");

  let turn = 0;
  while (turn < MAXTURN) {
    turn++;
    console.log();
    console.log({ turn });
    const playerCommands = await GetAllPlayerComands(Players);
    console.log();
    for (cmd of playerCommands) {
      console.log(
        `${cmd.player.color}${cmd.player.name} chooses ${cmd.command.name}${resetText}`
      );
      await cmd.command.effect(cmd.player, Players);
      await wait(1000);
    }
    for (player of Players) {
      player.defense = 0;
    }

    Players = Players.filter((player) => {
      const playerAlive = player.health > 0;
      if (!playerAlive)
        console.log(
          `${player.color}${player.name} has fallen to their wounds... ${resetText}`
        );
      return playerAlive;
    });
    await wait(2000);
    if (turn >= MAXTURN) {
      pubsub.publish("max turn reached");
      process.exit();
    }
  }
};
GameLoop();
