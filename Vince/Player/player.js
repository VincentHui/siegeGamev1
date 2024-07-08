const { rollOneDice } = require("../../common/dice.js");
const { wait } = require("../../common/wait.js");
const { SelectCommandInteractive } = require("../Player/userInteraction.js");
const { SelectCommandAI } = require("../Player/aiInteraction.js");

const ShootPlayer = (shooter) => {
  shooter.bullets--;
  const target = shooter.target;

  console.log(`${shooter.name} has shot ${target.name}`);
  console.log(`${shooter.name} has ${shooter.bullets} bullets left`);
  if (target.defense) {
    console.log(`${target.name} has used defense and receives no damage`);
    console.log(`${target.name} has ${target.health} health left`);
    return;
  }
  console.log(target);
  if (target.target.name === shooter.name) {
    console.log(`${target.name} has returned fire and receives no damage`);
    console.log(`${target.name} has ${target.health} health left`);
    return;
  }
  target.health--;
  console.log(`${target.name} has ${target.health} health left`);
};

const playerCommands = [
  {
    name: "shoot",
    effect: async (playerInstigator) => {
      ShootPlayer(playerInstigator);
    },
  },
  {
    name: "reload",
    effect: async (playerInstigator) => {
      playerInstigator.bullets++;
      console.log(
        `${playerInstigator.name} has loaded another bullet... ${playerInstigator.name} has ${playerInstigator.bullets} bullets`
      );
    },
  },
  {
    name: "defend",
    effect: async (playerInstigator) => {
      playerInstigator.defense = 1;
      console.log(`${playerInstigator.name} has defended themselves...`);
    },
  },
];

const PlayerTakesTurn = async (player, Players, playerCommands) => {
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

const GetAllPlayersChosenCommands = async (players, commands) => {
  const chosenCommands = [];
  for (let index = 0; index < players.length; index++) {
    const player = players[index];
    const chosenPlayerCommand = await PlayerTakesTurn(
      player,
      players,
      commands
    );
    chosenCommands.push({ command: chosenPlayerCommand, player });
  }
  chosenCommands.sort(SortPlayerCommands);
  return chosenCommands;
};

const SortPlayerCommands = (a, b) => {
  if (a.command.name === "defend" && b.command.name !== "defend") {
    return -1; // a comes before b
  }
  if (a.command.name !== "defend" && b.command.name === "defend") {
    return 1; // b comes before a
  }
  return 0; // a and b are equal
};

module.exports = {
  PlayerTakesTurn,
  GetAllPlayersChosenCommands,
  SortPlayerCommands,
  playerCommands,
};
