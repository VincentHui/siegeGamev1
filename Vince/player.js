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
  { name: "sam", color: redText, ai: true },
  { name: "ben", color: BasicBlue, ai: true },
  { name: "callum", color: yellowText, ai: true },
];

const SelectCommandInteractive = async (playerCommands, player) => {
  console.log("select");
  console.log(`${playerCommands.map((el, i) => `[${i === 0 ? "*" : ""}]`)}`);
  console.log(playerCommands[0]);

  const result = await navigateArray(playerCommands, (index, elements) => {
    readline.moveCursor(process.stdout, 0, -2);
    readline.clearScreenDown(process.stdout);
    console.log(`${elements.map((el, i) => `[${i === index ? "*" : ""}]`)}`);
    console.log(elements[index]);
  });
  readline.moveCursor(process.stdout, 0, -2);
  readline.clearScreenDown(process.stdout);
  console.log(`${player.name} chose to ${result}`);
  return result;
};

const SelectCommandAI = async (playerCommands, player) => {
  const commandIndex = rollOneDice(playerCommands.length) - 1;
  const randomTime = rollOneDice(4000) + 500;

  console.log(`${player.name} is choosing...`);
  //   console.log(`wait for ${randomTime}`);
  await wait(randomTime);
  console.log(`${player.name} has chosen`);
  return playerCommands[commandIndex];
};

const PlayerTurn = async (player) => {
  console.log(player.color);
  console.log(`${player.name}  :  turn`);

  const playerCommands = ["shoot", "reload", "defend"];

  let result = {};
  if (player.ai) {
    result = await SelectCommandAI(playerCommands, player);
  }
  if (!player.ai) {
    result = await SelectCommandInteractive(playerCommands, player);
  }

  console.log(resetText);
  return result;
};

const GetAllPlayerComands = async () => {
  const commands = [];
  for (let index = 0; index < Players.length; index++) {
    const player = Players[index];
    const playerCommand = await PlayerTurn(player);
    commands.push({ command: playerCommand, player });
  }
  return commands;
};

module.exports = {
  PlayerTurn,
  Players,
  GetAllPlayerComands,
};
