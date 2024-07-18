const { pubsub } = require("../common/pubSub.js");
const { ask } = require("../common/askPromise.js");
const { wait } = require("../common/wait.js");
const { SelectCommandAI } = require("./ai.js");
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

const MAXTURN = 20;

let Players = [
  // {
  //   name: "Sam",
  //   color: redText,
  //   ai: true,
  // skipped: false,
  //   health: 100,
  //   mana: 10,
  //   target: null,
  // items: [],
  // initiative: 1
  // team: `Dangerous`,
  // },
  {
    name: "Ben",
    color: BasicBlue,
    ai: false,
    skipped: false,
    health: 100,
    mana: 10,
    target: null,
    items: [],
    initiative: 1,
    team: `Amazing`,
  },
  {
    name: "Callum",
    color: yellowText,
    ai: true,
    skipped: false,
    health: 100,
    mana: 10,
    target: null,
    items: [],
    initiative: 1,
    team: `Cows`,
  },
  {
    name: "Vince",
    color: greenText,
    ai: true,
    skipped: false,
    health: 10,
    mana: 10,
    target: null,
    items: [],
    initiative: 1,
    team: `Trash`,
  },
  // {
  //   name: "Orc",
  //   color: grayText,
  //   ai: true,
  // skipped: false,
  //   health: 20,
  //   mana: 0,
  //   target: null,
  // initiative: 1
  // team: ``,
  // },
];

module.exports = {
  Players,
  MAXTURN,
};
