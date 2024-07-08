const { navigateArray } = require("../readArray.js");
const readline = require("readline");
const {
  redText,
  yellowText,
  BasicBlue,
  resetText,
} = require("../../common/colors.js");
const { rollOneDice } = require("../../common/dice.js");
const { wait } = require("../../common/wait.js");
const { targetSelect, commandSelect } = require("../Player/userInteraction.js");

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
        target = playerInstigator.target;
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

const SelectCommandInteractive = async (playerCommands, player, players) => {
  console.log("select");
  console.log(`${playerCommands.map((el, i) => `[${i === 0 ? "*" : ""}]`)}`);
  console.log(playerCommands[0].name);

  const result = await commandSelect(playerCommands, player, players);
  console.log(`${player.name} has chosen`);
  return result;
};

const SelectCommandAI = async (playerCommands, player, players) => {
  const HasBullets = player.bullets > 0;

  playerCommands = playerCommands.filter((cmd) => {
    return HasBullets ? true : cmd.name !== "shoot";
  });

  const commandIndex = rollOneDice(playerCommands.length) - 1;
  const randomTime = rollOneDice(4000) + 500;

  console.log(`${player.name} is choosing...`);
  await wait(randomTime);
  if (playerCommands[commandIndex].name === "shoot") {
    const targets = players.filter((target) => target.name !== player.name);
    player.target = targets[rollOneDice(targets.length) - 1];
  }
  console.log(`${player.name} has chosen`);
  return playerCommands[commandIndex];
};

const PlayerTakesTurn = async (player, Players) => {
  console.log(`${player.color}${player.name}  :  turn`);
  let result = {};
  if (player.ai) {
    result = await SelectCommandAI(playerCommands, player, Players);
  }
  if (!player.ai) {
    result = await SelectCommandInteractive(playerCommands, player, Players);
  }
  return result;
};

const GetAllPlayerComands = async (players) => {
  const playerCommands = [];
  for (let index = 0; index < players.length; index++) {
    const player = players[index];
    const playerCommand = await PlayerTakesTurn(player, players);
    playerCommands.push({ command: playerCommand, player });
  }
  playerCommands.sort(SortPlayerCommands);
  return playerCommands;
};

const SortPlayerCommands = (a, b) => {
  if (a.command.name === "defend" && b.command.name !== "defend") {
    return -1; // a comes before b
  }
  if (a.command.name !== "defend" && b.command.name === "defend") {
    return 1; // b comes before a
  }
  if (a.command.name < b.command.name) {
    return -1; // a comes before b alphabetically
  }
  if (a.command.name > b.command.name) {
    return 1; // b comes before a alphabetically
  }
  return 0; // a and b are equal
};

module.exports = {
  PlayerTakesTurn,
  GetAllPlayerComands,
  commandSelect,
  SortPlayerCommands,
};
