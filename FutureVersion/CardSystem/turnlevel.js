const { Eventcards, Manpower, Morale } = require("./eventcards");

// let Manpower = 2000;
// let Morale = 10;

// let Manpower = 2000;
// let Morale = 10;

// let Eventcards = [
//   {
//     name: "Thunderstorm",
//     description:
//       "A brewing storm opens the heavens. Rain pours down and soaks everyman to the bone.",
//     effect() {
//       console.log("I work");
//       Manpower = Manpower - 500;
//     },
//   },

//   {
//     name: "Captured Spy",
//     description:
//       "Some of our men captured a suspicious man walking among the camp.",
//     effect: function () {
//       Morale + 1;
//     },
//   },
//   {
//     name: "Sign in the Heavens",
//     description:
//       "A blazing star fell from the heavens to the earth, our men wonder at the sign.",
//     effect: function (Morale) {
//       const SignsMorale = Math.random() > 0.4 ? 5 : -15;
//       Morale += SignsMorale;
//     },
//   },
// ];

function Turnbase(turn, numberofturns, callback) {
  for (let i = turn; i < numberofturns; i++) {
    console.log([turn]);
    callback();
    // Manpower = Manpower + 1000;
    console.log("You have", Manpower, "men");
    console.log("Army morale at", Morale);
    turn++;
  }
}

function getRandomEventCard() {
  const randomIndex = Math.floor(Math.random() * Eventcards.length);
  return Eventcards[randomIndex];
}

function playEventCard() {
  const randomCard = getRandomEventCard();
  console.log(`Playing: ${randomCard.name} - ${randomCard.description}`);
  return randomCard.effect();
}

Turnbase(2, 20, playEventCard);
// -------------------------------------------------------------------------
