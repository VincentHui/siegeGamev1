let { GameState } = require("./gamestate.js");

let Eventcards = [
  {
    name: "Thunderstorm",
    description:
      "A brewing storm opens the heavens. Rain pours down and soaks everyman to the bone.",
    effect() {
      GameState.Manpower = GameState.Manpower + 1000;
    },
  },

  {
    name: "Captured Spy",
    description:
      "Some of our men captured a suspicious man walking among the camp.",
    effect() {
      GameState.Morale = GameState.Morale - 2;
    },
  },
  {
    name: "Sign in the Heavens",
    description:
      "A blazing star fell from the heavens to the earth, our men wonder at the sign.",
    effect() {
      GameState.Manpower = GameState.Manpower + 300;
    },
  },
  {
    name: "",
    description: "",
    effect() {},
  },
  {
    name: "",
    description: "",
    effect() {},
  },
  {
    name: "",
    description: "",
    effect() {},
  },
];
module.exports = { Eventcards };
