const readline = require("readline");
const { Players, gamestate } = require("./Players.js");
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
  softBlue,
  magText,
  abilityText,
} = require("../common/colors.js");

function initialLoader(duration) {
  return new Promise((resolve) => {
    const frames = [
      `-`,
      `--`,
      `---`,
      `----`,
      `-----`,
      `------`,
      `-------`,
      `--------`,
      `---------`,
      `----------`,
      `-----------`,
      `------------`,
      `-------------`,
      `--------------`,
      `---------------`,
      `----------------`,
      `-----------------`,
      `------------------`,
      `-------------------`,
      `--------------------`,
      `---------------------`,
      `----------------------`,
      `-----------------------`,
      `------------------------`,
      `-------------------------`,
      `--------------------------`,
      `---------------------------`,
      `----------------------------`,
      `-----------------------------`,
      `------------------------------`,
      `-------------------------------`,
      `--------------------------------`,
      `---------------------------------`,
      `----------------------------------`,
      `-----------------------------------`,
      `------------------------------------`,
      `-------------------------------------`,
      `--------------------------------------`,
      `---------------------------------------`,
      `----------------------------------------`,
      `-----------------------------------------`,
      `------------------------------------------`,
      `-------------------------------------------`,
      `--------------------------------------------`,
    ];
    let index = 0;

    const interval = setInterval(() => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(frames[index]);
      index = (index + 3) % frames.length;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      readline.cursorTo(process.stdout, 0);
      process.stdout.write("\n");
      resolve();
    }, duration);
  });
}

function dotLoader(duration) {
  return new Promise((resolve) => {
    const frames = [
      `.`,
      `.`,
      `.`,
      `.`,
      `..`,
      `..`,
      `..`,
      `..`,
      `...`,
      `...`,
      `...`,
      `...`,
      `.`,
      `.`,
      `.`,
      `.`,
      `..`,
      `..`,
      `..`,
      `..`,
      `...`,
      `...`,
      `...`,
      `...`,
      `.`,
      `.`,
      `.`,
      `.`,
      `..`,
      `..`,
      `..`,
      `..`,
      `...`,
      `...`,
      `...`,
      `...`,
    ];
    let index = 0;

    const interval = setInterval(() => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(frames[index]);
      index = (index + 1) % frames.length;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      readline.cursorTo(process.stdout, 0);
      process.stdout.write("\n");
      resolve();
    }, duration);
  });
}

function turnLoader(duration) {
  return new Promise((resolve) => {
    const frames = [
      `-`,
      `-`,
      `--`,
      `--`,
      `---`,
      `---`,

      `---T`,
      `---T`,

      `---TU`,
      `---TU`,

      `---TUR`,
      `---TUR`,
      `---TURN`,
      `---TURN`,
      `---TURN`,
      `---TURN`,
    ];
    let index = 0;

    const interval = setInterval(() => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(frames[index]);
      index = (index + 1) % frames.length;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      readline.cursorTo(process.stdout, 0);
      process.stdout.write("\n");
      resolve();
    }, duration);
  });
}

function teamLoader(duration) {
  return new Promise((resolve) => {
    const frames = [
      `-`,
      `-`,
      `--`,
      `--`,
      `---`,
      `---`,

      `---T`,
      `---T`,

      `---TE`,
      `---TE`,

      `---TEA`,
      `---TEA`,
      `---TEAM`,
      `---TEAM`,
      `---TEAM S`,
      `---TEAM S`,
      `---TEAM SE`,
      `---TEAM SE`,
      `---TEAM SEL`,
      `---TEAM SEL`,
      `---TEAM SELE`,
      `---TEAM SELE`,
      `---TEAM SELEC`,
      `---TEAM SELECT`,
      `---TEAM SELECT`,
      `---TEAM SELECT-`,
      `---TEAM SELECT-`,
      `---TEAM SELECT--`,
      `---TEAM SELECT--`,
      `---TEAM SELECT---`,
      `---TEAM SELECT---`,
      `---TEAM SELECT---`,
      `---TEAM SELECT---`,
      `---TEAM SELECT---`,
      `---TEAM SELECT---`,
    ];
    let index = 0;

    const interval = setInterval(() => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(frames[index]);
      index = (index + 2) % frames.length;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      readline.cursorTo(process.stdout, 0);
      process.stdout.write("\n");
      resolve();
    }, duration);
  });
}
module.exports = {
  teamLoader,
  initialLoader,
  turnLoader,
  dotLoader,
};
