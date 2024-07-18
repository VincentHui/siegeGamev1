const { Eventcards } = require("./eventcards");
const { GameState } = require("./gamestate.js");

// let GameState = {
//   Manpower: 2000,
//   Morale: 20,
// };

function Turnbase(turn, numberofturns, callback) {
  for (let i = turn; i < numberofturns; i++) {
    console.log([turn]);
    callback();

    console.log("You have", GameState.Manpower, "men");
    console.log("Army morale at", GameState.Morale);
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
  const effect = randomCard.effect();
  console.log({ effect });
}

Turnbase(2, 20, playEventCard);
// -------------------------------------------------------------------------
