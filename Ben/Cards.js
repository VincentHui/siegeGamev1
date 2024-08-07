const {
  GameState,
  MyTurn,
  NotMyTurn,
  playerprimary,
  playersecondary,
} = require("./GameState.js");
const { diceRoll } = require("../common/dice");
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

let PlayCards = [
  {
    name: `Wastrels Wrath`,
    cost: 1,
    extracost: "",
    type: "Trickery",
    description:
      "Inflicts a hex on the Enemy. The next time the Enemy skips their turn, inflict massive damage.",
    effect() {
      GameState[MyTurn.currentplayer].Mana =
        GameState[MyTurn.currentplayer].Mana - 1;
      GameState[NotMyTurn.notmyturn].WastrelsWrath =
        GameState[NotMyTurn.notmyturn].WastrelsWrath + 1;
      console.log(
        `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}is Hexed! ${grayText} Wastrels Wrath +1 stack${resetText}`
      );
      return;
    },
  },
  {
    name: "Scorpion Wire",
    cost: 1,
    extracost: "",
    type: "Trickery",
    description: "Throw a scorpion wire to disrupt your Enemy.",
    effect() {
      GameState[MyTurn.currentplayer].Mana =
        GameState[MyTurn.currentplayer].Mana - 1;
      GameState[NotMyTurn.notmyturn].Mana =
        GameState[NotMyTurn.notmyturn].Mana - 2;
      GameState[NotMyTurn.notmyturn].HP =
        GameState[NotMyTurn.notmyturn].HP - 15;
      console.log(
        `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}loses -15 HP, -2 MP${resetText}`
      );
    },
  },

  {
    name: "Mana Sap",
    cost: 1,
    extracost: "",
    type: "Spellbook",
    description: "Drain 4 Mana from your Enemy.",
    effect() {
      GameState[MyTurn.currentplayer].Mana =
        GameState[MyTurn.currentplayer].Mana - 1;
      GameState[NotMyTurn.notmyturn].Mana =
        GameState[NotMyTurn.notmyturn].Mana - 4;
      console.log(
        `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}loses -4 MP${resetText}`
      );
    },
  },
  {
    name: "Restore!",
    cost: 0,
    extracost: "",
    type: "Spellbook",
    description: "Recover a random amount of Health and Mana.",
    effect() {
      const HPRecover = Math.floor(Math.random() * 50) + 10;
      const ManaRecover = Math.floor(Math.random() * 5) + 3;
      (GameState[MyTurn.currentplayer].HP =
        GameState[MyTurn.currentplayer].HP + HPRecover),
        (GameState[MyTurn.currentplayer].Mana =
          GameState[MyTurn.currentplayer].Mana + ManaRecover);
      console.log(
        `...${playerprimary.who}Player ${MyTurn.currentplayer} ${greenText}restores +${HPRecover} HP and +${ManaRecover} Mana ${resetText}`
      );
    },
  },
  {
    name: "White Nova",
    cost: 2,
    extracost: "",
    type: "Luminary Arts",
    description:
      "Unleash a massive flash of light, preventing the Enemy from declaring an ability on their next turn",
    effect() {
      GameState[MyTurn.currentplayer].Mana =
        GameState[MyTurn.currentplayer].Mana - 2;
      GameState[NotMyTurn.notmyturn].Initiative = -2;
      console.log(
        `...${playersecondary.who}Player ${NotMyTurn.notmyturn}'s ${redText}next turn is skipped!${resetText}`
      );
    },
  },
  {
    name: `Exceed: Full Heal`,
    cost: 1,
    extracost: "",
    type: "Luminary Arts",
    description: `Restore 100 HP and remove all hexes. ${grayText}Exceed abilities skip your next turn.${resetText}`,
    effect() {
      GameState[MyTurn.currentplayer].Mana =
        GameState[MyTurn.currentplayer].Mana - 1;
      GameState[MyTurn.currentplayer].HP =
        GameState[MyTurn.currentplayer].HP + 100;
      GameState[MyTurn.currentplayer].Initiative = -2;
      if (GameState[MyTurn.currentplayer].WastrelsWrath > 0) {
        console.log(
          `...${playerprimary.who}Player ${MyTurn.currentplayer} ${greenText}Wastrels Wrath cured${resetText}`
        );
      }
      if (GameState[MyTurn.currentplayer].bloodhex > 0) {
        console.log(
          `...${playerprimary.who}Player ${MyTurn.currentplayer} ${greenText}Bleeding Hex cured${resetText}`
        );
      }
      console.log(
        `...${playerprimary.who}Player ${MyTurn.currentplayer} ${greenText}restores +100 HP \n...${resetText}${playerprimary.who}Player ${MyTurn.currentplayer}'s${redText} next turn is skipped${resetText}`
      );

      GameState[MyTurn.currentplayer].WastrelsWrath = 0;
      GameState[MyTurn.currentplayer].bloodhex = 0;
    },
  },
  {
    name: `Exceed: Execution`,
    cost: 4,
    extracost: "",
    type: "Corruption Arts",
    description: `Inflicts a huge amount of HP. ${grayText}Exceed abilities skip your next turn. ${resetText}`,
    effect() {
      GameState[MyTurn.currentplayer].Mana =
        GameState[MyTurn.currentplayer].Mana - 4;
      const executionDMG = Math.floor(Math.random() * 50) + 25;
      GameState[MyTurn.currentplayer].Initiative = -2;
      GameState[NotMyTurn.notmyturn].HP =
        GameState[NotMyTurn.notmyturn].HP - executionDMG;
      console.log(
        `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}loses -${executionDMG} HP \n${resetText}...${playerprimary.who}Player ${MyTurn.currentplayer}'s${redText} next turn is skipped${resetText}`
      );
    },
  },
  {
    name: `Gamble Strike`,
    cost: 1,
    extracost: "",
    type: "Trickery",
    description: "Roll 5 dice to inflict a varying amount of damage.",
    effect() {
      GameState[MyTurn.currentplayer].Mana =
        GameState[MyTurn.currentplayer].Mana - 1;
      let gambleStrike = diceRoll(5, 6);
      gambleStrike.forEach((element) => {
        GameState[NotMyTurn.notmyturn].HP =
          GameState[NotMyTurn.notmyturn].HP - element;

        console.log(
          `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}loses -${element} HP ${resetText}`
        );
      });
    },
  },
  {
    name: `Vampire Bite`,
    cost: 2,
    extracost: "",
    type: "Corruption Arts",
    description:
      "Inflict a random amount of damage, also gaining the same amount of HP.",
    effect() {
      GameState[MyTurn.currentplayer].Mana =
        GameState[MyTurn.currentplayer].Mana - 2;
      const VampireBite = Math.floor(Math.random() * 30) + 15;
      GameState[MyTurn.currentplayer].HP =
        GameState[MyTurn.currentplayer].HP + VampireBite;
      GameState[NotMyTurn.notmyturn].HP =
        GameState[NotMyTurn.notmyturn].HP - VampireBite;
      console.log(
        `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}loses -${VampireBite} HP${resetText} \n...${playerprimary.who}Player ${MyTurn.currentplayer} ${greenText}restores +${VampireBite} HP ${resetText}`
      );
    },
  },
  {
    name: `Heart Seeker`,
    cost: 1,
    extracost: "",
    type: "Corruption Arts",
    description:
      "Inflict a random amount of damage, dealing IMMENSE damage if your Health is higher than the Enemy.",
    effect() {
      GameState[MyTurn.currentplayer].Mana =
        GameState[MyTurn.currentplayer].Mana - 1;
      const Heartseeker = diceRoll(2, 6);
      let HeartseekerSum = Heartseeker.reduce((acc, val) => acc + val, 0);
      if (
        GameState[MyTurn.currentplayer].HP > GameState[NotMyTurn.notmyturn].HP
      ) {
        let difference =
          GameState[MyTurn.currentplayer].HP -
          GameState[NotMyTurn.notmyturn].HP;
        let HeartseekerTotal = HeartseekerSum + difference - 5;
        GameState[NotMyTurn.notmyturn].HP =
          GameState[NotMyTurn.notmyturn].HP - HeartseekerTotal;
        console.log(
          `...${playersecondary.who}Player ${NotMyTurn.notmyturn}${redText} loses ${redText}-${HeartseekerTotal} HP${resetText}`
        );
        return;
      } else
        GameState[NotMyTurn.notmyturn].HP =
          GameState[NotMyTurn.notmyturn].HP - HeartseekerSum;
      console.log(
        `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}loses -${HeartseekerSum} HP${resetText}`
      );
    },
  },
  {
    name: `Blood is Power!`,
    cost: 2,
    extracost: "-10 HP",
    type: "Corruption Arts",
    description:
      "Draw blood from yourself to inflict a debilitating hex on the Enemy. Each subsequent turn inflicts damage over time.",
    effect() {
      GameState[MyTurn.currentplayer].Mana =
        GameState[MyTurn.currentplayer].Mana - 2;

      GameState[MyTurn.currentplayer].HP =
        GameState[MyTurn.currentplayer].HP - 10;

      GameState[NotMyTurn.notmyturn].bloodhex =
        GameState[NotMyTurn.notmyturn].bloodhex + 1;
      console.log(
        `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}is Hexed! ${grayText} Bleeding +1 stack${resetText}`
      );
      return;
    },
  },
  // {
  //   name: `Quick Cut`,
  //   cost: 1,
  //   extracost: "",
  //   type: "Trickery",
  //   description:
  //     "Draw blood from yourself to inflict a debilitating hex on the Enemy. Each subsequent turn inflicts damage over time.",
  //   effect() {
  //     GameState[MyTurn.currentplayer].Mana =
  //       GameState[MyTurn.currentplayer].Mana - 2;

  //     GameState[MyTurn.currentplayer].HP =
  //       GameState[MyTurn.currentplayer].HP - 10;

  //     GameState[NotMyTurn.notmyturn].bloodhex =
  //       GameState[NotMyTurn.notmyturn].bloodhex + 1;
  //     console.log(
  //       `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}is Hexed! ${grayText} Bleeding +1 stack${resetText}`
  //     );
  //     return;
  //   },
  // },
];
module.exports = { PlayCards };
