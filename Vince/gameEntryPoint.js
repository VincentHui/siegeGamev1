// var readline = require("readline-sync");

const { diceRoll } = require("../common/dice.js");
const { PlayCards } = require("./Cards.js");
const {
  GameState,
  MyTurn,
  NotMyTurn,
  playerprimary,
  playersecondary,
} = require("./GameState.js");
const {
  yellowText,
  redText,
  greenText,
  whiteText,
  lightred,
  resetText,
  magText,
  boldText,
  abilityText,
  BasicBlue,
  grayText,
  cyanHighlight,
} = require("../common/colors.js");
const { pubsub } = require("../common/pubSub.js");
const { ask } = require("../common/askPromise.js");
require("./Notification.js");

const MAXTURN = 10;

const Players = [{ name: "sam" }, { name: "ben" }, { name: "vince" }];

const GameLoop = async () => {
  await ask("Enter input to start ");
  pubsub.publish("start");

  let turn = 0;
  while (turn < MAXTURN) {
    turn++;
    console.log({ turn });

    displayArray(["ass", "balls", "assballs"]);

    for (let index = 0; index < Players.length; index++) {
      const player = Players[index];
      const answer = await ask(`player "${player.name}" enter a command`);
    }

    if (turn >= MAXTURN) {
      pubsub.publish("max turn reached");
      break;
    }
  }
  process.exit();
};
GameLoop();
