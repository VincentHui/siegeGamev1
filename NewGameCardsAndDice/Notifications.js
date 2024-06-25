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
  lightred,
  BasicBlue,
  grayText,
  cyanHighlight,
} = require("../FutureVersion/Colors.js");

// let notifications = [
//   {
//     //0
//     name: `Wastrels Wrath1`,
//     alert: `${grayText}Player ${
//       MyTurn.currentplayer
//     } currently afflicted with ${
//       GameState[MyTurn.currentplayer].WastrelsWrath
//     } stack(s) of Wastrel's Wrath!`,
//   },
//   {
//     //1
//     name: `Wastrels Wrath2`,
//     alert: `${grayText}Player ${NotMyTurn.notmyturn} currently afflicted with ${
//       GameState[NotMyTurn.notmyturn].WastrelsWrath
//     } stack(s) of Wastrel's Wrath!`,
//   },
//   {
//     //2
//     name: `Bleeding Hex 1`,
//     alert: `${grayText}Player ${
//       MyTurn.currentplayer
//     } currently afflicted with ${
//       GameState[MyTurn.currentplayer].bloodhex
//     } stack(s) of Bleeding!`,
//   },
//   {
//     //3
//     name: `Bleeding Hex 2`,
//     alert: `${grayText}Player ${NotMyTurn.notmyturn} currently afflicted with ${
//       GameState[NotMyTurn.notmyturn].bloodhex
//     } stack(s) of Bleeding!`,
//   },
// ];

function Alerts() {
  console.log(
    `                ${BasicBlue}Player 1: ${greenText}${GameState[1].HP}${resetText} HP, ${greenText}${GameState[1].Mana}${resetText} MP`
  );
  if (GameState[1].WastrelsWrath > 0) {
    console.log(
      `                 ${lightred}-Wastrel's Wrath ${grayText}x${GameState[1].WastrelsWrath}`
    );
  }
  if (GameState[1].bloodhex > 0) {
    console.log(
      `                 ${lightred}-Bleeding ${grayText}x${GameState[1].bloodhex}`
    );
  }
  console.log(
    `                ${magText}Player 2: ${greenText}${GameState[2].HP}${resetText} HP, ${greenText}${GameState[2].Mana}${resetText} MP`
  );
  if (GameState[2].WastrelsWrath > 0) {
    console.log(
      `                 ${lightred}-Wastrel's Wrath ${grayText}x${GameState[2].WastrelsWrath}`
    );
  }
  if (GameState[2].bloodhex > 0) {
    console.log(
      `                 ${lightred}-Bleeding ${grayText}x${GameState[2].bloodhex}`
    );
  }
}
module.exports = { Alerts };
