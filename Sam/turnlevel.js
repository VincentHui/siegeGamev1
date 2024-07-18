const { Eventcards } = require("./eventcards");
const { GameState, Roll } = require("./gamestate.js");
const { Progress } = require("./progress.js");

const {
  yellowText,
  redText,
  greenText,
  abilityText,
  magText,
  whiteText,
  BasicBlue,
  resetText,
  cyanHighlight,
  boldText,
  grayText,
} = require("../FutureVersion/Colors.js");

let location = Progress.playerPosition;
function updateMap(roll) {
  if (roll > 8) {
    currentlocation = location++;
    // let location = Progress.playerPosition;
    console.log(
      `${greenText}Your army has captured territory and moved to ${Progress.Map[currentlocation]}${resetText}`
    );
  } else {
    GameState.Manpower = GameState.Manpower - 500;
    console.log(
      `${redText}Your army remains at ${Progress.Map[location]}${resetText}`
    );
  }
}
function Turnbase(turn, numberofturns, callback) {
  for (let i = turn; i < numberofturns; i++) {
    console.log([turn]);
    callback();
    let roll = Roll();
    console.log("Roll result:", roll);
    updateMap(roll);
    console.log("You have", GameState.Manpower, "men");
    console.log("Army morale at", GameState.Morale);
    // console.log("${Progress.Map[Progress.playerPosition]}");
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
