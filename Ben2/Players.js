const { pubsub } = require("../common/pubSub.js");
const { ask } = require("../common/askPromise.js");
const { wait } = require("../common/wait.js");
const { SelectCommandAI } = require("./ai.js");
const {
  yellowText,
  redText,
  whiteText,
  orangeText,
  softBlue,
  greenText,
  resetText,
  amazingColor,
  commonColor,
  trashColor,
  cyanHighlight,
  pinkText,
  boldText,
  BasicBlue,
  grayText,
  lightred,
  magText,
  abilityText,
} = require("../common/colors.js");

let gamestate = { MAXTURN: 20, turn: 0 };

let YesNo = [
  { name: "yes", description: "" },
  { name: "no", description: "" },
];

let Team = [
  {
    name: `${amazingColor}Team Amazing`,
    description: `${grayText}These individuals have a natural born gift and affinity to magic. Often times, you will see the people named "Ben" belonging to this team.${resetText}`,
    color: amazingColor,
  },
  {
    name: `${commonColor}Team Common`,
    description: `${grayText}These individuals had to study and attend a school of magic, thus possessing no natural born talent.${resetText}`,
    color: commonColor,
  },
  {
    name: `${trashColor}Team Trash`,
    description: `${grayText}These people are not magically gifted in any way, and are of very low intellect. Often times, you will see that people with the name "Vincent" will typically belong to this team${resetText}`,
    color: trashColor,
  },
];
let Players = [
  {
    name: "Sam",
    color: magText,
    ai: true,
    skipped: false,
    health: 50,
    mana: 10,
    target: null,
    items: [],
    initiative: 1,
    team: `asd23`,
    hexes: { bloodhex: 0, wastrelshex: 0 },
  },
  {
    name: "Ben",
    color: softBlue,
    ai: false,
    skipped: false,
    health: 50,
    mana: 10,
    target: null,
    items: [],
    initiative: 1,
    team: `asdasdas`,
    hexes: { bloodhex: 0, wastrelshex: 0 },
  },
  {
    name: "Cal",
    color: orangeText,
    ai: true,
    skipped: false,
    health: 50,
    mana: 10,
    target: null,
    items: [],
    initiative: 1,
    team: `asdas`,
    hexes: { bloodhex: 0, wastrelshex: 0 },
  },
  {
    name: "Vince",
    color: pinkText,
    ai: true,
    skipped: false,
    health: 50,
    mana: 10,
    target: null,
    items: [],
    initiative: 1,
    team: `Trash`,
    hexes: { bloodhex: 0, wastrelshex: 0 },
  },
  // {
  //   name: "Orc",
  //   color: grayText,
  //   ai: true,
  //   skipped: false,
  //   health: 20,
  //   mana: 0,
  //   target: null,
  //   initiative: 1,
  //   team: ``,
  // hexes: { bloodhex: 0, wastrelshex: 0 },
  // },
];

module.exports = {
  Players,
  Team,
  YesNo,
  gamestate,
};
