const { rollOneDice } = require("../../common/dice.js");
const { wait } = require("../../common/wait.js");

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

module.exports = {
  SelectCommandAI,
};
