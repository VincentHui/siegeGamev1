const { navigateArray } = require("./readArray.js");
const readline = require("readline");
const {
  yellowText,
  redText,
  whiteText,
  greenText,
  resetText,
  cyanHighlight,
  boldText,
  BasicBlue,
  grayText,
  lightred,
  magText,
  abilityText,
} = require("../common/colors.js");
const { Players, MAXTURN } = require("./Players.js");

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

async function playerCommandSelect(playerCommands, player, players) {
  while (true) {
    const result = await navigateArray(playerCommands, (index, elements) => {
      readline.moveCursor(process.stdout, 8, -3);
      readline.clearScreenDown(process.stdout);
      console.log(
        `${player.color}${elements.map(
          (el, i) => `[${i === index ? "*" : ""}]`
        )}`
      );
      console.log(`${abilityText}${elements[index].name}`);
      console.log(`${resetText}${elements[index].description}`);
    });
    readline.moveCursor(process.stdout, 0, -2);
    readline.clearScreenDown(process.stdout);
    // if (result.name === "shoot" && player.bullets <= 0) {
    //   console.log("no bullets to shoot");
    //   continue;
    // }
    if (result.targetskill === `yes`) {
      let targets = players.filter((target) => target.name !== player.name);
      if (player.team) {
        targets = targets.filter((target) => target.team !== player.team);
      }
      console.log(
        `${player.color}${targets.map((el, i) => `[${i === 0 ? "*" : ""}]`)}`
      );
      console.log(`${targets[0].name}`);
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

const SelectCommandInteractive = async (playerCommands, player, players) => {
  // if (player.Initiative < 1) {
  //   console.log(
  //     `${player.color}${player.name}'s ${yellowText}turn is skipped!${resetText}`
  //   );
  //   wastrelHex();
  //   return;
  // }
  // console.log("select");

  console.log(
    `Select: ${playerCommands.map((el, i) => `[${i === 0 ? "*" : ""}]`)}`
  );
  console.log(`${abilityText}${playerCommands[0].name}`);
  console.log(`${resetText}${playerCommands[0].description}`);
  const result = await playerCommandSelect(playerCommands, player, players);
  console.log(`${player.color}${player.name} has chosen`);
  return result;
};

module.exports = {
  userArraySelect,
  playerCommandSelect,
  targetSelect,
  SelectCommandInteractive,
};
