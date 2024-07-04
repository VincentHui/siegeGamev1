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

const MyTurn = { currentplayer: 2 };
const NotMyTurn = { notmyturn: 1 };
const playerprimary = { who: `${BasicBlue}Player 1:${resetText}` };
const playersecondary = { who: `${magText}Player 2:${resetText}` };

let GameState = {
  Players: [
    {
      HP: 100,
      Mana: 10,
      Initiative: 1,
      WastrelsWrath: 0,
      bloodhex: 0,
    },
    {
      HP: 100,
      Mana: 10,
      Initiative: 1,
      WastrelsWrath: 0,
      bloodhex: 0,
    },
  ],
};
let changeturn = [{}];
module.exports = {
  GameState,
  MyTurn,
  NotMyTurn,
  playerprimary,
  playersecondary,
};
