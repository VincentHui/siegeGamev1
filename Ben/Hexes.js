const {
  GameState,
  MyTurn,
  NotMyTurn,
  playerprimary,
  playersecondary,
} = require("./GameState.js");
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

function bleedingHex() {
  if (GameState[MyTurn.currentplayer].bloodhex > 0) {
    let bloodhexdmg = GameState[MyTurn.currentplayer].bloodhex * 5;
    GameState[MyTurn.currentplayer].HP =
      GameState[MyTurn.currentplayer].HP - bloodhexdmg;
    console.log(
      `...${playerprimary.who}Player ${MyTurn.currentplayer} ${redText}is Bleeding! -${bloodhexdmg} HP.${resetText}`
    );
  }
  if (GameState[NotMyTurn.notmyturn].bloodhex > 0) {
    let bloodhexdmg = GameState[NotMyTurn.notmyturn].bloodhex * 5;
    GameState[NotMyTurn.notmyturn].HP =
      GameState[NotMyTurn.notmyturn].HP - bloodhexdmg;
    console.log(
      `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}is Bleeding! -${bloodhexdmg} HP.${resetText}`
    );
  }
}

function wastrelHex() {
  {
    if (GameState[MyTurn.currentplayer].WastrelsWrath > 0) {
      let wastreldmg = GameState[MyTurn.currentplayer].WastrelsWrath * 40;
      GameState[MyTurn.currentplayer].HP =
        GameState[MyTurn.currentplayer].HP - wastreldmg;
      console.log(
        `${redText}-Wastrels Wrath triggers! Player ${MyTurn.currentplayer} loses -${wastreldmg} HP.${resetText}`
      );
      GameState[MyTurn.currentplayer].WastrelsWrath = 0;
    }
  }

  return;
}

module.exports = { bleedingHex, wastrelHex };

// function Enemyturn() {
//   if (Enemy.Initiative < 1) {
//     console.log(`\n${grayText}...Enemy turn skipped!${resetText}\n`);
//     if (Enemy.WastrelsWrath > 0) {
//       let wastreldmg = Enemy.WastrelsWrath * 40;
//       Enemy.HP = Enemy.HP - wastreldmg;
//       console.log(
//         `${redText} Wastrels Wrath triggers! Inflict -${wastreldmg} HP.${resetText}`
//       );
//       Enemy.WastrelsWrath = -1;
//       return;
//     }
//     return;
//   } else {
//     const Enemyattack = diceRoll(4, 6);
//     let Enemyattacksum = Enemyattack.reduce((acc, val) => acc + val, 0);
//     let Enemyattacktotal = Enemyattacksum + Enemy.Mana;
//     Player1.HP = Player1.HP - Enemyattacktotal;
//     console.log(
//       `\n ${grayText}...Your opponent has inflicted ${redText}${Enemyattacktotal} ${grayText}HP!${resetText}\n`
//     );
//   }
// }
