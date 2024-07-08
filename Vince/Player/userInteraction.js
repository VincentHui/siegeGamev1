const { navigateArray } = require("../readArray.js");
const readline = require("readline");

async function userArraySelect(array) {
  const result = await navigateArray(array, (index, elements) => {
    readline.moveCursor(process.stdout, 0, -2);
    readline.clearScreenDown(process.stdout);
    console.log(`${elements.map((el, i) => `[${i === index ? "*" : ""}]`)}`);
    console.log(elements[index]);
  });
  readline.moveCursor(process.stdout, 0, -2);
  readline.clearScreenDown(process.stdout);
  return result;
}

async function commandSelect(playerCommands, player, players) {
  while (true) {
    const result = await navigateArray(playerCommands, (index, elements) => {
      readline.moveCursor(process.stdout, 0, -2);
      readline.clearScreenDown(process.stdout);
      console.log(`${elements.map((el, i) => `[${i === index ? "*" : ""}]`)}`);
      console.log(elements[index].name);
    });
    readline.moveCursor(process.stdout, 0, -2);
    readline.clearScreenDown(process.stdout);
    if (result.name === "shoot" && player.bullets <= 0) {
      console.log("no bullets to shoot");
      continue;
    }
    if (result.name === "shoot") {
      const targets = players.filter((target) => target.name !== player.name);
      console.log(`${targets.map((el, i) => `[${i === 0 ? "*" : ""}]`)}`);
      console.log(targets[0].name);
      const target = await targetSelect(targets);
      player.target = target;
      return result;
    }
    return result;
  }
}

async function targetSelect(players) {
  const result = await navigateArray(players, (index, elements) => {
    readline.moveCursor(process.stdout, 0, -2);
    readline.clearScreenDown(process.stdout);
    console.log(`${elements.map((el, i) => `[${i === index ? "*" : ""}]`)}`);
    console.log(elements[index].name);
  });
  readline.moveCursor(process.stdout, 0, -2);
  readline.clearScreenDown(process.stdout);
  return result;
}

module.exports = {
  userArraySelect,
  commandSelect,
  targetSelect,
};
