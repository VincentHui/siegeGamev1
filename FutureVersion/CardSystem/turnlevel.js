const { Eventcards, Manpower, Morale } = require("./eventcards");

// let Manpower = 2000;
// let Morale = 10;

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
