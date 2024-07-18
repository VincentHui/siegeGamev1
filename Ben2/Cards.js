const { diceRoll } = require("../common/dice");
const { Players } = require("./Players.js");
const { SelectCommandAI } = require("./ai.js");
const {
  yellowText,
  redText,
  whiteText,
  greenText,
  resetText,
  cyanHighlight,
  boldText,
  BasicBlue,
  grayText,
  lightred,
  magText,
  abilityText,
} = require("../common/colors.js");

const DmgPlayer = (attacker) => {
  const target = attacker.target;

  console.log(`${attacker.name} has shot ${attacker.name}`);
  console.log(`${shooter.name} has ${shooter.bullets} bullets left`);
  if (target.defense) {
    console.log(`${target.name} has used defense and receives no damage`);
    console.log(`${target.name} has ${target.health} health left`);
    return;
  }
  if (target.target && target.target.name === shooter.name) {
    console.log(`${target.name} has returned fire and receives no damage`);
    console.log(`${target.name} has ${target.health} health left`);
    return;
  }
  target.health--;
  console.log(`${target.name} has ${target.health} health left`);
};

let PlayCards = [
  // {
  //   name: `Skip Turn`,
  //   cost: 1,
  //   extracost: "",
  //   type: "Trickery",
  //   description: "",
  //   effect: "",
  // },
  // {
  //   name: `Wastrels Wrath`,
  //   cost: 1,
  //   extracost: "",
  //   type: "Trickery",
  //   description:
  //     "Inflicts a hex on the Enemy. The next time the Enemy skips their turn, inflict massive damage.",
  //   effect() {
  //     GameState[MyTurn.currentplayer].Mana =
  //       GameState[MyTurn.currentplayer].Mana - 1;
  //     GameState[NotMyTurn.notmyturn].WastrelsWrath =
  //       GameState[NotMyTurn.notmyturn].WastrelsWrath + 1;
  //     console.log(
  //       `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}is Hexed! ${grayText} Wastrels Wrath +1 stack${resetText}`
  //     );
  //     return;
  //   },
  // },

  {
    name: "Scorpion Wire",
    cost: 1,
    extracost: "",
    targetskill: `yes`,
    type: "Trickery",
    description: `${grayText}Throw a scorpion wire to disrupt your Enemy. ${grayText}Cost: -1 MP`,
    effect: async (user) => {
      user.mana--;
      const target = user.target;
      (target.mana = target.mana - 2), (target.health = target.health - 15);
      console.log(
        `${user.color}${user.name}${resetText} uses ${abilityText}Scorpion Wire${resetText}... ${target.color}${target.name} ${redText}loses -15 HP, -2 MP${resetText}`
      );
    },
  },

  {
    name: "Mana Sap",
    cost: 1,
    extracost: "",
    targetskill: `yes`,
    type: "Spellbook",
    description: `${grayText}Drain 4 Mana from your Enemy. ${grayText}Cost: -1 MP`,
    effect: async (user) => {
      user.mana--;
      const target = user.target;
      target.mana = target.mana - 4;
      console.log(
        `${user.color}${user.name}${resetText} uses ${abilityText}Mana Sap${resetText}... ${target.color}${target.name} ${redText}loses -4 MP${resetText}`
      );
    },
  },
  {
    name: "Restore!",
    cost: 0,
    extracost: "",
    type: "Spellbook",
    description: `${grayText}Recover a random amount of Health and Mana. ${grayText}Cost: 0 MP`,
    effect: async (user) => {
      const HPRecover = Math.floor(Math.random() * 25) + 10;
      const ManaRecover = Math.floor(Math.random() * 3) + 3;
      (user.health = user.health + HPRecover),
        (user.mana = user.mana + ManaRecover);
      console.log(
        `${user.color}${user.name} uses ${abilityText}Restore!${resetText}${greenText} +${HPRecover} HP and +${ManaRecover} Mana ${resetText}`
      );
    },
  },
  {
    name: "White Nova",
    cost: 2,
    extracost: "",
    targetskill: `yes`,
    type: "Luminary Arts",
    description: `${grayText}Unleash a massive flash of light, preventing the Enemy from declaring an ability on their next turn. ${grayText}Cost: -2 MP`,
    effect: async (user) => {
      user.mana--;
      user.mana--;
      const target = user.target;
      target.initiative = -1;
      console.log(
        `${user.color}${user.name}${resetText} uses ${abilityText}White Nova${resetText}... ${target.color}${target.name}'s ${redText}next turn is skipped!${resetText}`
      );
    },
  },

  // {
  //   name: `Exceed: Full Heal`,
  //   cost: 1,
  //   extracost: "",
  //   type: "Luminary Arts",
  //   description: `Restore 100 HP and remove all hexes. ${grayText}Exceed abilities skip your next turn.${resetText}`,
  //   effect() {
  //     GameState[MyTurn.currentplayer].Mana =
  //       GameState[MyTurn.currentplayer].Mana - 1;
  //     GameState[MyTurn.currentplayer].HP =
  //       GameState[MyTurn.currentplayer].HP + 100;
  //     GameState[MyTurn.currentplayer].Initiative = -2;
  //     if (GameState[MyTurn.currentplayer].WastrelsWrath > 0) {
  //       console.log(
  //         `...${playerprimary.who}Player ${MyTurn.currentplayer} ${greenText}Wastrels Wrath cured${resetText}`
  //       );
  //     }
  //     if (GameState[MyTurn.currentplayer].bloodhex > 0) {
  //       console.log(
  //         `...${playerprimary.who}Player ${MyTurn.currentplayer} ${greenText}Bleeding Hex cured${resetText}`
  //       );
  //     }
  //     console.log(
  //       `...${playerprimary.who}Player ${MyTurn.currentplayer} ${greenText}restores +100 HP \n...${resetText}${playerprimary.who}Player ${MyTurn.currentplayer}'s${redText} next turn is skipped${resetText}`
  //     );

  //     GameState[MyTurn.currentplayer].WastrelsWrath = 0;
  //     GameState[MyTurn.currentplayer].bloodhex = 0;
  //   },
  // },
  // {
  //   name: `Exceed: Execution`,
  //   cost: 4,
  //   extracost: "",
  //   type: "Corruption Arts",
  //   description: `Inflicts a huge amount of HP. ${grayText}Exceed abilities skip your next turn. ${resetText}`,
  //   effect() {
  //     GameState[MyTurn.currentplayer].Mana =
  //       GameState[MyTurn.currentplayer].Mana - 4;
  //     const executionDMG = Math.floor(Math.random() * 50) + 25;
  //     GameState[MyTurn.currentplayer].Initiative = -2;
  //     GameState[NotMyTurn.notmyturn].HP =
  //       GameState[NotMyTurn.notmyturn].HP - executionDMG;
  //     console.log(
  //       `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}loses -${executionDMG} HP \n${resetText}...${playerprimary.who}Player ${MyTurn.currentplayer}'s${redText} next turn is skipped${resetText}`
  //     );
  //   },
  // },
  {
    name: `Gamble Strike`,
    cost: 1,
    extracost: "",
    targetskill: `yes`,
    type: "Trickery",
    description: `${grayText}Roll 5 dice to inflict a varying amount of damage. ${grayText}Cost: -1 MP`,
    effect: async (user) => {
      user.mana--;
      const target = user.target;
      let gambleStrike = diceRoll(5, 6);
      gambleStrike.forEach((element) => {
        target.health = target.health - element;

        console.log(
          `${user.color}${user.name}${resetText} uses ${abilityText}Gamble Strike${resetText}... ${target.color}${target.name} ${redText}loses -${element} HP ${resetText}`
        );
      });
    },
  },
  {
    name: `Vampire Bite`,
    cost: 2,
    extracost: "",
    targetskill: `yes`,
    type: "Corruption Arts",
    description: `${grayText}Inflict a random amount of damage, also gaining the same amount of HP. ${grayText}Cost: -2 MP`,
    effect: async (user) => {
      user.mana--;
      user.mana--;
      const target = user.target;
      const VampireBite = Math.floor(Math.random() * 15) + 10;
      user.health = user.health + VampireBite;
      target.health = target.health - VampireBite;
      console.log(
        `${user.color}${user.name}${resetText} uses ${abilityText}Vampire Bite${resetText}... ${target.color}${target.name} ${redText}loses -${VampireBite} HP${resetText}, ${user.color}${user.name}${resetText} ${greenText}restores +${VampireBite} HP ${resetText}`
      );
    },
  },
  // {
  //   name: `Heart Seeker`,
  //   cost: 1,
  //   extracost: "",
  //   type: "Corruption Arts",
  //   description:
  //     "Inflict a random amount of damage, dealing IMMENSE damage if your Health is higher than the Enemy.",
  //   effect() {
  //     GameState[MyTurn.currentplayer].Mana =
  //       GameState[MyTurn.currentplayer].Mana - 1;
  //     const Heartseeker = diceRoll(2, 6);
  //     let HeartseekerSum = Heartseeker.reduce((acc, val) => acc + val, 0);
  //     if (
  //       GameState[MyTurn.currentplayer].HP > GameState[NotMyTurn.notmyturn].HP
  //     ) {
  //       let difference =
  //         GameState[MyTurn.currentplayer].HP -
  //         GameState[NotMyTurn.notmyturn].HP;
  //       let HeartseekerTotal = HeartseekerSum + difference - 5;
  //       GameState[NotMyTurn.notmyturn].HP =
  //         GameState[NotMyTurn.notmyturn].HP - HeartseekerTotal;
  //       console.log(
  //         `...${playersecondary.who}Player ${NotMyTurn.notmyturn}${redText} loses ${redText}-${HeartseekerTotal} HP${resetText}`
  //       );
  //       return;
  //     } else
  //       GameState[NotMyTurn.notmyturn].HP =
  //         GameState[NotMyTurn.notmyturn].HP - HeartseekerSum;
  //     console.log(
  //       `...${playersecondary.who}Player ${NotMyTurn.notmyturn} ${redText}loses -${HeartseekerSum} HP${resetText}`
  //     );
  //   },
  // },
  // {
  //   name: `Blood is Power!`,
  //   cost: 2,
  //   extracost: "-10 HP",
  //   type: "Corruption Arts",
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
