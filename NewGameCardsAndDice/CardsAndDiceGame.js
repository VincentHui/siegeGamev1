const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const {
  diceRoll,
} = require("../FutureVersion/CardSystem/examples/diceExample");
const { PlayCards } = require("./Cards.js");
const { Alerts } = require("./Notifications.js");
const { bleedingHex, wastrelHex } = require("./Hexes.js");
const { GameState, MyTurn, NotMyTurn } = require("./GameState.js");
const {
  yellowText,
  redText,
  greenText,
  whiteText,
  resetText,
  magText,
  boldText,
  abilityText,
  BasicBlue,
  grayText,
  cyanHighlight,
} = require("../FutureVersion/Colors.js");

function manyTurns(
  currentTurn,
  numberofTurns,
  whosturn,
  notifs,
  callback,
  ability,
  Hex
) {
  if (GameState[1].HP < 1) {
    console.log(`${yellowText}GAMEOVER. Player 2 WINS`);
    rl.close();
    return;
  }
  if (GameState[2].HP < 1) {
    console.log(`${yellowText}GAMEOVER. Player 1 WINS`);
    rl.close();
    return;
  }
  if (currentTurn > numberofTurns - 1) {
    rl.close();
    return;
  }
  currentTurn = currentTurn + 1;
  whosturn();
  notifs();
  ability();
  callback();
  Hexes();

  rl.question("...", () => {
    manyTurns(
      currentTurn,
      numberofTurns,
      whosturn,
      notifs,
      callback,
      ability,
      Hex
    );
  });
}

function RandomCard() {
  const randomIndex = Math.floor(Math.random() * PlayCards.length);
  return PlayCards[randomIndex];
}

function PlayAbility() {
  if (GameState[MyTurn.currentplayer].Initiative < 1) {
    console.log(
      `\n${yellowText}Player ${MyTurn.currentplayer}'s turn is skipped!${resetText}`
    );
    wastrelHex();
    return;
  }
  if (GameState[MyTurn.currentplayer].Mana < 1) {
    console.log(
      `\n${redText}Player ${MyTurn.currentplayer} has no Mana!${greenText}Recover 2 Mana. ${resetText}`
    );
    GameState[MyTurn.currentplayer].Mana = GameState[1].Mana + 2;
  } else {
    const randomCard = RandomCard();
    console.log(
      `\n${yellowText}Player ${MyTurn.currentplayer} plays:\n${abilityText}${randomCard.name} ${grayText}- ${randomCard.description}${grayText} Cost: -${randomCard.cost} MP ${randomCard.extracost} ${resetText}`
    );
    const effect = randomCard.effect();
  }
}

function InitiativeMechanics() {
  GameState[1].Initiative = GameState[1].Initiative + 1;
  GameState[2].Initiative = GameState[2].Initiative + 1;
}

function changeTurn() {
  if (MyTurn.currentplayer === 2) {
    MyTurn.currentplayer = MyTurn.currentplayer - 1;
    NotMyTurn.notmyturn = NotMyTurn.notmyturn + 1;
    return;
  }
  if (MyTurn.currentplayer === 1) {
    MyTurn.currentplayer = MyTurn.currentplayer + 1;
    NotMyTurn.notmyturn = NotMyTurn.notmyturn - 1;
    return;
  }
}
function notifs() {
  Alerts();
}
function Hexes() {
  bleedingHex();
}

manyTurns(
  0,
  220,
  changeTurn,
  notifs,
  InitiativeMechanics,
  PlayAbility,
  Hexes()
);
