const { pubsub } = require("../common/pubSub.js");
const { ask } = require("../common/askPromise.js");
const { wait } = require("../common/wait.js");
require("./Notification.js");
const {
  GetAllPlayersChosenCommands,
  playerCommands,
} = require("./Player/player.js");
const {
  resetText,
  redText,
  BasicBlue,
  yellowText,
  greenText,
} = require("../common/colors.js");
const { startLoader } = require("../common/loader.js");
const { ChooseWeapon } = require("./Weapons/chooseWeapon.js");

const MAXTURN = 100;

let Players = [
  {
    name: "sam",
    color: redText,
    ai: true,
    bullets: 0,
    health: 2,
    target: null,
    inventory: [],
  },
  {
    name: "ben",
    color: BasicBlue,
    ai: true,
    bullets: 0,
    health: 2,
    target: null,
    inventory: [],
  },
  {
    name: "callum",
    color: yellowText,
    ai: true,
    bullets: 0,
    health: 2,
    target: null,
    inventory: [],
  },
  {
    name: "vince",
    color: greenText,
    ai: false,
    bullets: 0,
    health: 2,
    target: null,
    inventory: [],
  },
];

const GameLoop = async () => {
  await ask("Enter input to start ");
  await startLoader(3000);
  pubsub.publish("start");

  for (const player of Players) {
    await ChooseWeapon(player, player.ai);
  }

  pubsub.publish("playersChosen", Players);

  let turn = 0;
  while (turn < MAXTURN) {
    turn++;
    console.log();
    console.log({ turn });
    pubsub.publish("newTurn", { turn });

    Players = Players.filter((player) => {
      return player.health > 0;
    });

    const chosenCommands = await GetAllPlayersChosenCommands(
      Players,
      playerCommands
    );
    console.log();
    for (cmd of chosenCommands) {
      console.log(
        `${cmd.player.color}${cmd.player.name} chooses ${cmd.command.name}${resetText}`
      );
      await cmd.command.effect(cmd.player);
      await wait(1000);
    }
    for (player of Players) {
      player.defense = 0;
      player.target = null;
    }
    Players.forEach((player) => {
      if (player.health <= 0) {
        pubsub.publish("playerDied", { deadplayer: player, players: Players });
      }
    });

    Players.forEach((player) => {
      if (player.health <= 0) {
        console.log(
          `${player.color}${player.name} has fallen to their wounds... ${resetText}`
        );
      }
    });

    await wait(2000);
    if (Players.length === 1) {
      console.log();
      console.log(
        `${Players[0].color}${Players[0].name}${resetText} is the last one standing...`
      );
      pubsub.publish("playerSurvived", Players[0]);
      await wait(2000);
      process.exit();
    }
    if (Players.length === 0) {
      console.log();
      console.log(`all have failed the trial of the bullet...`);
      pubsub.publish("allHaveDied");
      await wait(2000);
      process.exit();
    }
    if (turn >= MAXTURN) {
      pubsub.publish("max turn reached");
      process.exit();
    }
    pubsub.publish("endTurn", { turn });
  }
};
GameLoop();
