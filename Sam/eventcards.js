let { GameState } = require("./gamestate.js");

let Eventcards = [
  {
    name: "Thunderstorm",
    description:
      "A brewing storm opens the heavens. Rain pours down and soaks everyman to the bone.",
    weight: 1,
    effect() {
      GameState.attacker.Manpower = GameState.attacker.Manpower - 500;
    },
  },

  {
    name: "Captured Spy",
    description:
      "Some of our men captured a suspicious man walking among the camp.",
    weight: 0.5,
    effect() {
      GameState.attacker.Morale = GameState.attacker.Morale + 2;
    },
  },
  {
    name: "Sign in the Heavens",
    description:
      "A blazing star fell from the heavens to the earth, our men wonder at the sign.",
    weight: 0.4,
    effect() {
      GameState.attacker.Manpower = GameState.attacker.Manpower + 300;
    },
  },
  {
    name: "No Event",
    description: "Nothing ever happens",
    weight: 5,
    effect() {},
  },
];
module.exports = { Eventcards };
