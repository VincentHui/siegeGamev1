const { rollOneDice } = require("../common/dice.js");
const { wait } = require("../common/wait.js");
const { Players, MAXTURN } = require("./Players.js");
const { turnLoader, dotLoader } = require("./turnloader.js");
const readline = require("readline");

const SelectCommandAI = async (playerCommands, player, players) => {
  const HasBullets = player.bullets > 0;

  playerCommands = playerCommands.filter((cmd) => {
    return HasBullets ? true : cmd.name !== "shoot";
  });

  const commandIndex = rollOneDice(playerCommands.length) - 1;
  const randomTime = rollOneDice(2500) + 500;

  await dotLoader(randomTime);

  if (playerCommands[commandIndex].targetskill === `yes`) {
    let targets = players.filter((target) => target.name !== player.name);
    if (player.team) {
      targets = targets.filter((target) => target.team !== player.team);
    }
    player.target = targets[rollOneDice(targets.length) - 1];
  }

  readline.moveCursor(process.stdout, 0, -1);
  console.log(`${player.name} has chosen`);
  return playerCommands[commandIndex];
};

module.exports = {
  SelectCommandAI,
};
