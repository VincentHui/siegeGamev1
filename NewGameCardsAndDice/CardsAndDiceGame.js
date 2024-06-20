const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const {
  diceRoll,
} = require("../FutureVersion/CardSystem/examples/diceExample");
const { PlayCards } = require("./Cards.js");
const { Player1, Enemy } = require("./GameState.js");
const {
  yellowText,
  redText,
  greenText,
  whiteText,
  resetText,
  magText,
  boldText,
  abilityText,
  grayText,
  cyanHighlight,
} = require("../FutureVersion/Colors.js");

function manyTurns(currentTurn, numberofTurns, callback, ability, Enemyturn) {
  if (Player1.HP < 1) {
    console.log(`${yellowText}GAMEOVER. YOU DIED`);
    rl.close();
    return;
  }
  if (Enemy.HP < 1) {
    console.log(`${yellowText}GAMEOVER. YOU ARE THE VICTOR`);
    rl.close();
    return;
  }
  if (currentTurn > numberofTurns - 1) {
    rl.close();
    return;
  }

  currentTurn = currentTurn + 1;
  console.log(
    `${yellowText}--------------------Turn ${currentTurn}---------------------${resetText}`
  );
  console.log(
    `Player: ${greenText}${Player1.HP}${resetText} HP, ${greenText}${Player1.Mana}${resetText} MP | Enemy: ${greenText}${Enemy.HP}${resetText} HP, ${greenText}${Enemy.Mana}${resetText} MP`
  );
  Enemyturn();
  ability();
  callback();

  rl.question("...", () => {
    manyTurns(currentTurn, numberofTurns, callback, ability, Enemyturn);
  });
}

function RandomCard() {
  const randomIndex = Math.floor(Math.random() * PlayCards.length);
  return PlayCards[randomIndex];
}

function PlayAbility() {
  if (Player1.Initiative < 1) {
    console.log(`${grayText}Your turn is skipped...${resetText}`);
    return;
  }
  if (Player1.Mana < 1) {
    console.log(
      `${redText}You have no Mana!${greenText}Recover 2 Mana. ${resetText}`
    );
    Player1.Mana = Player1.Mana + 2;
  } else {
    const randomCard = RandomCard();
    console.log(
      `You played:${abilityText} ${randomCard.name} ${grayText}- ${randomCard.description}${grayText} Cost: -${randomCard.cost} MP ${resetText}`
    );
    const effect = randomCard.effect();
  }
}

function InitiativeMechanics() {
  Player1.Initiative = Player1.Initiative + 1;
  Enemy.Initiative = Enemy.Initiative + 1;
}

function Enemyturn() {
  if (Enemy.Initiative < 1) {
    console.log(`\n${grayText}...Enemy turn skipped!${resetText}\n`);
    if (Enemy.WastrelsWrath > 0) {
      let wastreldmg = Enemy.WastrelsWrath * 40;
      Enemy.HP = Enemy.HP - wastreldmg;
      console.log(
        `${redText} Wastrels Wrath triggers! Inflict -${wastreldmg} HP.${resetText}`
      );
      Enemy.WastrelsWrath = -1;
      return;
    }
    return;
  } else {
    const Enemyattack = diceRoll(4, 6);
    let Enemyattacksum = Enemyattack.reduce((acc, val) => acc + val, 0);
    let Enemyattacktotal = Enemyattacksum + Enemy.Mana;
    Player1.HP = Player1.HP - Enemyattacktotal;
    console.log(
      `\n ${grayText}...Your opponent has inflicted ${redText}${Enemyattacktotal} ${grayText}HP!${resetText}\n`
    );
  }
}

manyTurns(0, 22, InitiativeMechanics, PlayAbility, Enemyturn);
