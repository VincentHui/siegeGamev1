const { diceRoll } = require("../common/dice");
const { Players } = require("./Players.js");
const { SelectCommandAI } = require("./ai.js");
const { wait } = require("../common/wait.js");
const {
  yellowText,
  redText,
  whiteText,
  greenText,
  resetText,
  cyanHighlight,
  boldText,
  pinkText,
  amazingColor,
  commonColor,
  trashColor,
  BasicBlue,
  orangeText,
  grayText,
  lightred,
  softBlue,
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
  {
    name: `Wastrels Wrath`,
    cost: 1,
    extracost: "",
    targetskill: `yes`,
    type: "Trickery",
    description: `${grayText}Inflicts a hex on the Enemy. The next time the Enemy skips their turn, inflict massive damage. ${grayText}Cost: -1 MP`,
    effect: async (user) => {
      user.mana--;
      const target = user.target;
      target.hexes.wastrelshex++;
      console.log(
        `${resetText}...${target.color}${target.name}${resetText} is ${redText}Hexed! ${grayText} Wastrels Wrath +1 stack${resetText}`
      );
      return;
    },
  },

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
        `${resetText}...${target.color}${target.name}${resetText} loses ${redText}-15 HP, -2 MP${resetText}`
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
        `${resetText}...${target.color}${target.name}${resetText} loses ${redText}-4 MP${resetText}`
      );
    },
  },
  {
    name: "Restore!",
    cost: 1,
    extracost: "",
    type: "Spellbook",
    description: `${grayText}Recover a random amount of Health and Mana. ${grayText}Cost: 1 MP`,
    effect: async (user) => {
      user.mana--;
      const HPRecover = Math.floor(Math.random() * 20) + 10;
      const ManaRecover = Math.floor(Math.random() * 3) + 2;
      (user.health = user.health + HPRecover),
        (user.mana = user.mana + ManaRecover);
      console.log(
        `${resetText}...${resetText}${user.color}${user.name}${resetText} gains ${greenText}+${HPRecover} HP${resetText} and ${greenText}+${ManaRecover} Mana ${resetText}`
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
        `${resetText}...${target.color}${target.name}'s ${resetText}next turn is ${redText}skipped!${resetText}`
      );
    },
  },

  {
    name: `Exceed: Full Heal`,
    cost: 2,
    extracost: "",
    type: "Luminary Arts",
    description: `${grayText}Restore 40 HP and remove all hexes- at the expense of skipping your next turn. ${grayText}Exceed abilities skip your next turn.${grayText} Cost: 2 MP`,
    effect: async (user) => {
      user.mana--;
      user.mana--;
      user.health = user.health + 40;
      user.initiative = -1;
      if (user.hexes.wastrelshex > 0) {
        console.log(
          `...${user.color}${user.name}${resetText} ${greenText}removes Wastrel's Wrath Hex!${resetText}`
        );
      }
      if (user.hexes.bloodhex > 0) {
        console.log(
          `...${user.color}${user.name}${resetText} ${greenText}removes Bleeding Hex!${resetText}`
        );
      }
      console.log(
        `...${user.color}${user.name}${resetText} gains ${greenText}+40 HP \n${resetText}...${user.color}${user.name}'s${redText} next turn is skipped${resetText}`
      );

      user.hexes.wastrelshex = 0;
      user.hexes.bloodhex = 0;
    },
  },

  {
    name: `Feed From Corruption`,
    cost: 1,
    extracost: "",
    type: "Corruption Arts",
    description: `${grayText}Heal for a small amount, gaining extra health for each hex you are afflicted with. ${grayText}Cost: 1 MP`,
    effect: async (user) => {
      user.mana--;
      const HPRecover = Math.floor(Math.random() * 9) + 6;
      const wastrelhexheal = user.hexes.wastrelshex * 10;
      const bloodhexheal = user.hexes.bloodhex * 10;
      user.health = user.health + HPRecover + wastrelhexheal + bloodhexheal;

      console.log(
        `...${user.color}${user.name}${resetText} gains ${greenText}+${HPRecover} HP`
      );
      if ((user.hexes.wastrelshex > 0, user.hexes.bloodhex > 0)) {
        console.log(
          `...${user.color}${
            user.name
          }${resetText} gains an extra ${greenText}+${
            wastrelhexheal + bloodhexheal
          } HP${resetText}`
        );
      }
    },
  },
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
          `${resetText}...${target.color}${target.name} ${resetText}loses${redText} -${element} HP ${resetText}`
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
      const VampireBite = Math.floor(Math.random() * 12) + 8;
      user.health = user.health + VampireBite;
      target.health = target.health - VampireBite;
      console.log(
        `${resetText}...${target.color}${target.name}${resetText} loses ${redText}-${VampireBite} HP${resetText}\n...${user.color}${user.name}${resetText} gains ${greenText}+${VampireBite} HP ${resetText}`
      );
    },
  },
  {
    name: `Heart Seeker`,
    cost: 2,
    extracost: "",
    targetskill: `yes`,
    type: "Corruption Arts",
    description: `${grayText}Inflict a random amount of damage, dealing DOUBLE damage if your Health is higher than the Enemy. ${grayText}Cost: 2 MP`,
    effect: async (user) => {
      user.mana--;
      user.mana--;
      const target = user.target;
      const Heartseeker = diceRoll(5, 6);
      let HeartseekerSum = Heartseeker.reduce((acc, val) => acc + val, 0);
      if (user.health > target.health) {
        let doubledmg = HeartseekerSum + HeartseekerSum;
        target.health = target.health - doubledmg;
        console.log(
          `${resetText}...${target.color}${target.name}${resetText} takes double damage!\n${resetText}...${target.color}${target.name}${resetText} loses ${redText}-${doubledmg} HP${resetText}`
        );
        return;
      } else target.health = target.health - HeartseekerSum;
      console.log(
        `${resetText}...${target.color}${target.name}${resetText} loses ${redText}-${HeartseekerSum} HP${resetText}`
      );
    },
  },
  // {
  //   name: `Blood is Power!`,
  //   cost: 2,
  //   extracost: "-10 HP",
  //   type: "Corruption Arts",
  //   description:
  //     "Draw blood from yourself to inflict a debilitating hex on the Enemy. Each subsequent turn inflicts damage over time.

  // Inflict a debilitating hex on all players including yourself... friend or foe. Each subsequent turn inflicts damage over time.",
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
  {
    name: `Blood is Power!`,
    cost: 2,
    extracost: "",
    targetskill: `yes`,
    type: "Corruption Arts",
    description: `${grayText}Draw blood and damage yourself to inflict a debilitating hex on the Enemy. Each subsequent turn inflicts damage over time. ${grayText}Cost: -2 MP, -5 HP`,
    effect: async (user) => {
      user.mana--;
      user.mana--;
      user.health = user.health - 5;
      const target = user.target;
      target.hexes.bloodhex++;
      console.log(
        `${resetText}...${target.color}${target.name}${resetText} is ${redText}Hexed! ${grayText} Bleeding +1 stack${resetText}`
      );
      return;
    },
  },
];
module.exports = { PlayCards };
