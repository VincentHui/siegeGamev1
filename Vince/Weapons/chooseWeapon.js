const { navigateArray } = require("../readArray.js");
const { rollOneDice } = require("../../common/dice.js");
const { wait } = require("../../common/wait.js");
const readline = require("readline");
const { resetText } = require("../../common/colors.js");

const Weapons = [
  {
    name: "corpse",
    description: [
      "a gun submerged in the filth of death",
      "you start with 5 health",
      "everytime you reload you gain 2 bullets and lose 1 heatlh",
      "on death everyone loses 1 health",
    ],
    onGiven: (player) => {
      console.log("the corpse gun stinks...");
    },
  },
  {
    name: "king of fingernails",
    description: [
      "this gun uses fingernails of the last gun saint",
      "no reloading you only trust the saints nails",
      "receive 10 nails",
      "when shooting a defending player choose to roll dice and recieve a curse or gift ",
    ],
    onGiven: (player) => {
      console.log("the gun contains ten finger nails...");
    },
  },
  {
    name: "old steel",
    description: [
      "the steel is beyond time with unknown makers",
      "destory young gods! each bullet takes two health",
      "a bullet takes two reloads to load",
    ],
    onGiven: (player) => {
      console.log("the gun steel radiates oldness...");
    },
  },
];

const AiChoose = async (player) => {
  const weapon = Weapons[rollOneDice(Weapons.length) - 1];
  const randomTime = rollOneDice(3000) + 2000;
  console.log(`${player.name} is choosing`);
  return weapon;
};

const PlayerChoose = async (weapons) => {
  console.log(`${weapons.map((el, i) => `[${i === 0 ? "*" : ""}]`)}`);
  console.log(weapons[0].name);
  const weapon = await navigateArray(weapons, (index, elements) => {
    readline.moveCursor(process.stdout, 0, -2);
    readline.clearScreenDown(process.stdout);
    console.log(`${elements.map((el, i) => `[${i === index ? "*" : ""}]`)}`);
    console.log(elements[index].name);
  });
  readline.moveCursor(process.stdout, 0, -2);
  readline.clearScreenDown(process.stdout);
  return weapon;
};

const ChooseWeapon = async (player, isAi) => {
  const weaponPromise = isAi ? AiChoose(player) : PlayerChoose(Weapons);
  const weapon = await weaponPromise;
  //   console.log("weapon", weapon);
  player.inventory.push(weapon);
  weapon.onGiven(player);
  console.log(
    `${player.color}${player.name} has chosen ${weapon.name}${resetText}`
  );
  console.log();
  await wait(2000);
};

module.exports = {
  ChooseWeapon,
};
