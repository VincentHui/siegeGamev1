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
  //   name: "sam",
  //   color: redText,
  //   ai: true,
  // skipped: false,
  //   health: 100,
  //   mana: 10,
  //   target: null,
  // items: [],
  // initiative: 1
  // },
  {
    name: "ben",
    color: BasicBlue,
    ai: false,
    skipped: false,
    health: 100,
    mana: 0,
    target: null,
    items: [],
    initiative: 1,
  },
  {
    name: "callum",
    color: yellowText,
    ai: true,
    skipped: false,
    health: 100,
    mana: 0,
    target: null,
    items: [],
    initiative: 1,
  },
  {
    name: "vince",
    color: greenText,
    ai: true,
    skipped: false,
    health: 100,
    mana: 10,
    target: null,
    items: [],
    initiative: 1,
  },
  // {
  //   name: "orc",
  //   color: grayText,
  //   ai: true,
  // skipped: false,
  //   health: 20,
  //   mana: 0,
  //   target: null,
  // initiative: 1
  // },
];

module.exports = {
  Players,
  MAXTURN,
};
