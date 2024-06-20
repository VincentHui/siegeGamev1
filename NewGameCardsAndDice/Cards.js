const { Player1, Enemy } = require("./GameState.js");
const {
  diceRoll,
} = require("../FutureVersion/CardSystem/examples/diceExample");
const {
  yellowText,
  redText,
  greenText,
  abilityText,
  magText,
  whiteText,
  resetText,
  cyanHighlight,
  boldText,
  grayText,
} = require("../FutureVersion/Colors.js");

let PlayCards = [
  {
    name: `Wastrels Wrath`,
    cost: 1,
    type: "Trickery",
    description:
      "Inflicts a hex on the Enemy. The next time the Enemy skips their turn, inflict massive damage.",
    effect() {
      Player1.Mana = Player1.Mana - 1;
      Enemy.WastrelsWrath = Enemy.WastrelsWrath + 1;
      console.log(
        `${redText}Enemy inflicted with 1 stack of Wastrel Wrath.${resetText}`
      );
      return;
    },
  },
  {
    name: "Scorpion Wire",
    cost: 2,
    type: "Trickery",
    description: "Throw a scorpion wire to disrupt your enemy.",
    effect() {
      Player1.Mana = Player1.Mana - 2;
      Enemy.Mana = Enemy.Mana - 2;
      Enemy.HP = Enemy.HP - 15;
      console.log(`${redText}Enemy inflicted -15 HP, -2 MP.${resetText}`);
    },
  },

  {
    name: "Mana Sap",
    cost: 1,
    type: "Spellbook",
    description: "Drain 4 Mana from your enemy.",
    effect() {
      Player1.Mana = Player1.Mana - 1;
      Enemy.Mana = Enemy.Mana - 4;
      console.log(`${redText}Enemy loses -4 MP.${resetText}`);
    },
  },
  {
    name: "Restore!",
    cost: 0,
    type: "Spellbook",
    description: "Recover a random amount of Health and Mana.",
    effect() {
      const HPRecover = Math.floor(Math.random() * 50) + 10;
      const ManaRecover = Math.floor(Math.random() * 5) + 3;
      (Player1.HP = Player1.HP + HPRecover),
        (Player1.Mana = Player1.Mana + ManaRecover);
      console.log(
        `${greenText} + ${HPRecover} HP and ${ManaRecover} Mana ${resetText}`
      );
    },
  },
  {
    name: "White Nova",
    cost: 3,
    type: "Luminary Arts",
    description:
      "Unleash a massive flash of light, preventing the enemy from declaring an ability on their next turn",
    effect() {
      Player1.Mana = Player1.Mana - 3;
      Enemy.Initiative = -1;
      console.log(`${redText}Skip enemy's next turn!${resetText}`);
    },
  },
  {
    name: `Exceed: Full Heal`,
    cost: 1,
    type: "Luminary Arts",
    description: `Restore 100 HP. ${grayText}Exceed abilities skip your next turn.${resetText}`,
    effect() {
      Player1.Mana = Player1.Mana - 1;
      Player1.HP = Player1.HP + 100;
      Player1.Initiative = -1;
      console.log(
        `${greenText} Restore +100 HP. ${grayText}Your next turn is skipped.${resetText}`
      );
    },
  },
  {
    name: `Exceed: Execution`,
    cost: 5,
    type: "Corruption Arts",
    description: `Inflicts a huge amount of HP. ${grayText}Exceed abilities skip your next turn. ${resetText}`,
    effect() {
      Player1.Mana = Player1.Mana - 5;
      const executionDMG = Math.floor(Math.random() * 50) + 25;
      Player1.Initiative = -1;
      Enemy.HP = Enemy.HP - executionDMG;
      console.log(
        `${redText}Enemy inflicted -${executionDMG} HP. ${grayText} Your next turn is skipped. ${resetText}`
      );
    },
  },
  {
    name: `Gamble Strike`,
    cost: 1,
    type: "Trickery",
    description: "Roll 5 dice to inflict a varying amount of damage.",
    effect() {
      Player1.Mana = Player1.Mana - 1;
      let gambleStrike = diceRoll(5, 6);
      gambleStrike.forEach((element) => {
        Enemy.HP = Enemy.HP - element;

        console.log(`${redText}Enemy inflicted -${element} HP. ${resetText}`);
      });
    },
  },
  {
    name: `Vampire Bite`,
    cost: 2,
    type: "Corruption Arts",
    description:
      "Inflict a random amount of damage, also gaining the same amount of HP.",
    effect() {
      Player1.Mana = Player1.Mana - 2;
      const VampireBite = Math.floor(Math.random() * 30) + 15;
      Player1.HP = Player1.HP + VampireBite;
      Enemy.HP = Enemy.HP - VampireBite;
      console.log(
        `${redText}Enemy inflicted -${VampireBite} HP. ${greenText}Restore +${VampireBite} HP. ${resetText}`
      );
    },
  },
  {
    name: `Heartseeker`,
    cost: 1,
    type: "Corruption Arts",
    description:
      "Inflict a random amount of damage, dealing IMMENSE damage if your Health is higher than the enemy.",
    effect() {
      Player1.Mana = Player1.Mana - 1;
      const Heartseeker = diceRoll(2, 6);
      let HeartseekerSum = Heartseeker.reduce((acc, val) => acc + val, 0);
      if (Player1.HP > Enemy.HP) {
        let difference = Player1.HP - Enemy.HP;
        let HeartseekerTotal = HeartseekerSum + difference;
        Enemy.HP = Enemy.HP - HeartseekerTotal;
        console.log(
          `${redText}Enemy inflicted -${HeartseekerTotal} HP.${resetText}`
        );
        return;
      } else Enemy.HP = Enemy.HP - HeartseekerSum;
      console.log(
        `${redText}Enemy inflicted -${HeartseekerSum} HP.${resetText}`
      );
    },
  },
];
module.exports = { PlayCards };
