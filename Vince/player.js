const { navigateArray } = require("./readArray.js");
const readline = require("readline");
const {
  redText,
  yellowText,
  BasicBlue,
  resetText,
} = require("../common/colors.js");
const { rollOneDice } = require("../common/dice.js");
const { wait } = require("../common/wait.js");

const Players = [
  { name: "sam", color: redText, ai: true, bullets: 1, health: 2 },
  { name: "ben", color: BasicBlue, ai: true, bullets: 1, health: 2 },
  { name: "callum", color: yellowText, ai: true, bullets: 1, health: 2 },
];

async function userArraySelect(playerCommands) {
  const result = await navigateArray(playerCommands, (index, elements) => {
    readline.moveCursor(process.stdout, 0, -2);
    readline.clearScreenDown(process.stdout);
    console.log(`${elements.map((el, i) => `[${i === index ? "*" : ""}]`)}`);
    console.log(elements[index]);
  });
  readline.moveCursor(process.stdout, 0, -2);
  readline.clearScreenDown(process.stdout);
  return result;
}

const ShootPlayer = (shooter, target) => {
  shooter.bullets--;

  console.log(`${shooter.name} has shot ${target.name}`);
  console.log(`${shooter.name} has ${shooter.bullets} bullets left`);
  if (target.defense) {
    console.log(`${target.name} has used defense and receives no damage`);
    console.log(`${target.name} has ${target.health} health left`);
    return;
  }
  target.health--;
  console.log(`${target.name} has ${target.health} health left`);
};

const playerCommands = [
  {
    name: "shoot",
    effect: async (playerInstigator, players) => {
      const targets = players.filter(
        (target) => target.name !== playerInstigator.name
      );
      var target = {};
      if (playerInstigator.ai) {
        target = targets[rollOneDice(targets.length) - 1];
      }
      if (!playerInstigator.ai) {
        target = await userArraySelect(targets);
      }
      ShootPlayer(playerInstigator, target);
    },
  },
  {
    name: "reload",
    effect: async (playerInstigator, players) => {
      playerInstigator.bullets++;
      console.log(
        `${playerInstigator.name} has loaded another bullet... ${playerInstigator.name} has ${playerInstigator.bullets} bullets`
      );
    },
  },
  {
    name: "defend",
    effect: async (playerInstigator, players) => {
      playerInstigator.defense = 1;
      console.log(`${playerInstigator.name} has defended themselves...`);
    },
  },
];

const SelectCommandInteractive = async (playerCommands, player) => {
  console.log("select");
  console.log(`${playerCommands.map((el, i) => `[${i === 0 ? "*" : ""}]`)}`);
  console.log(playerCommands[0]);

  const result = await userArraySelect(playerCommands);
  console.log(`${player.name} chose to ${result}`);
  return result;
};

const SelectCommandAI = async (playerCommands, player) => {
  const commandIndex = rollOneDice(playerCommands.length) - 1;
  const randomTime = rollOneDice(4000) + 500;

  console.log(`${player.name} is choosing...`);
  await wait(randomTime);
  console.log(`${player.name} has chosen`);
  return playerCommands[commandIndex];
};

const PlayerTakesTurn = async (player) => {
  console.log(`${player.color}${player.name}  :  turn`);
  let result = {};
  if (player.ai) {
    result = await SelectCommandAI(playerCommands, player);
  }
  if (!player.ai) {
    result = await SelectCommandInteractive(playerCommands, player);
  }
  return result;
};

const GetAllPlayerComands = async () => {
  const commands = [];
  for (let index = 0; index < Players.length; index++) {
    const player = Players[index];
    const playerCommand = await PlayerTakesTurn(player);
    commands.push({ command: playerCommand, player });
  }
  return commands;
};

module.exports = {
  PlayerTakesTurn,
  Players,
  GetAllPlayerComands,
  playerCommands,
};
