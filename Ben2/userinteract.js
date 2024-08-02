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
  softBlue,
  grayText,
  lightred,
  magText,
  orangeText,
  pinkText,
  abilityText,
} = require("../common/colors.js");

const { Players, MAXTURN, YesNo } = require("./Players.js");

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
      console.log(`${resetText}${abilityText}${elements[index].name}`);
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
  console.log(
    `Select: ${playerCommands.map((el, i) => `[${i === 0 ? "*" : ""}]`)}`
  );
  console.log(`${resetText}${abilityText}${playerCommands[0].name}`);
  console.log(`${resetText}${playerCommands[0].description}`);
  const result = await playerCommandSelect(playerCommands, player, players);
  console.log(`${player.color}${player.name} has chosen`);
  return result;
};

async function playerYesorNo(playerCommands) {
  while (true) {
    const result = await navigateArray(playerCommands, (index, elements) => {
      readline.moveCursor(process.stdout, 8, -2);
      readline.clearScreenDown(process.stdout);
      console.log(`${elements.map((el, i) => `[${i === index ? "*" : ""}]`)}`);
      console.log(`${yellowText}${elements[index].name}`);
    });
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearScreenDown(process.stdout);
    return result;
  }
}

const SelectYesorNo = async (YesNo) => {
  console.log(`Select: ${YesNo.map((el, i) => `[${i === 0 ? "*" : ""}]`)}`);
  console.log(`${yellowText}${YesNo[0].name}`);
  const result = await playerYesorNo(YesNo);
  return result;
};

async function passiveSelect(array) {
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

module.exports = {
  passiveSelect,
  userArraySelect,
  SelectYesorNo,
  playerCommandSelect,
  targetSelect,
  SelectCommandInteractive,
};
