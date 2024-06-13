let Manpower = 2000;
let Morale = 10;

let Eventcards = [
  {
    name: "Thunderstorm",
    description:
      "A brewing storm opens the heavens. Rain pours down and soaks everyman to the bone.",
    effect: function () {
      Manpower - 500;
    },
  },

  {
    name: "Captured Spy",
    description:
      "Some of our men captured a suspicious man walking among the camp.",
    effect: function () {
      Morale + 1;
    },
  },
  {
    name: "Sign in the Heavens",
    description:
      "A blazing star fell from the heavens to the earth, our men wonder at the sign.",
    effect: function (Morale) {
      const SignsMorale = Math.random() > 0.4 ? 5 : -15;
      Morale += SignsMorale;
    },
  },
];
module.exports = { Eventcards, Manpower, Morale };
