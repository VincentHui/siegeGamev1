const { navigateArray } = require("../readArray.js");
const { rollOneDice } = require("../../common/dice.js");
const { wait } = require("../../common/wait.js");
const readline = require("readline");
const { resetText } = require("../../common/colors.js");
const { pubsub } = require("../../common/pubSub.js");
const { ask } = require("../../common/askPromise.js");

const Weapons = [
  {
    name: "corpse",
    description: [
      "a gun submerged in the filth of death",
      "you start with 5 health",
      "everytime you reload you gain 2 bullets and lose 1 heatlh",
      "on death everyone loses 1 health",
    ],
    onGiven: (player) => {
      console.log("the corpse gun stinks...");
      pubsub.subscribe("playerDied", (topic, arg) => {
        if (arg.deadplayer.name === player.name) {
          console.log("the corpse bloats...");
          console.log(`all players lose health`);
          const playersNotDead = arg.players.filter(
            (player) => player.name !== arg.deadplayer.name
          );

          playersNotDead.forEach((player) => {
            player.health--;
          });

          playersNotDead.forEach((player) => {
            const playerAlive = player.health > 0;
            if (!playerAlive) {
              pubsub.publish("playerDied", {
                deadplayer: player,
                players: playersNotDead,
              });
            }
          });
        }
      });
      pubsub.subscribe("playerReloaded", (topic, arg) => {
        if (arg.player.name === player.name) {
          console.log("the corpse reloads...");
          player.health -= 1;
          player.bullets++;
          console.log(
            `${player.name} losese health and has ${player.health} health left`
          );
          console.log(
            `${player.name} uses corpse flesh to gain a bullet and now has ${player.bullets} bullets`
          );
        }
      });
      player.health = 5;
    },
  },
  {
    name: "king of fingernails",
    description: [
      "this gun uses fingernails of the last gun saint",
      "receive 5 nails",
      "when shooting a defending player either the shooter or target receives a gift",
    ],
    onGiven: (player) => {
      console.log("the gun contains five finger nails...");
      player.bullets = 5;

      pubsub.subscribe("targetDefendedFire", async (topic, arg) => {
        if (arg.shooter !== player) return

      })
    },
  },
  {
    name: "old steel",
    description: [
      "the steel is beyond time with unknown makers",
      "destory young gods! each bullet takes two health",
      "a bullet takes two reloads to load",
    ],
    onGiven: (player) => {
      console.log("the gun steel radiates oldness...");
    },
  },
  {
    name: "no gods!",
    description: ["start with a bullet"],
    onGiven: (player) => {
      console.log("we only need ourselves...");
      player.bullets++;
    },
  },
  {
    name: "gemini",
    description: ["you have a twin"],
    onGiven: (player) => {
      console.log("the creation of a twin is painful...");
      pubsub.subscribe("playersChosen", (topic, players) => {
        console.log(
          `${player.color}${player.name}${resetText} Gemini formed...`
        );
        //why is this so dumb lmao
        players.push(
          JSON.parse(
            JSON.stringify({
              ...player,
              name: player.name + " gemini",
            })
          )
        );
      });
    },
  },
];

const AiChoose = async (player) => {
  const weapon = Weapons[rollOneDice(Weapons.length) - 1];
  console.log(`${player.name} is choosing`);
  return weapon;
};

const PlayerChoose = async (weapons) => {
  console.log();
  console.log(`${weapons.map((el, i) => `[${i === 0 ? "*" : ""}]`)}`);
  console.log(weapons[0].name.toUpperCase());
  const diffInLines = 5 - weapons[0].description.length;
  weapons[0].description.forEach((line) => console.log(line));
  for (let index = 0; index < diffInLines; index++) {
    console.log();
  }
  const chosenWeapon = await navigateArray(weapons, (index, elements) => {
    readline.moveCursor(process.stdout, 0, -7);
    readline.clearScreenDown(process.stdout);

    console.log(`${elements.map((el, i) => `[${i === index ? "*" : ""}]`)}`);
    console.log(elements[index].name.toUpperCase());

    const diffInLines = 5 - elements[index].description.length;
    elements[index].description.forEach((line) => console.log(line));
    for (let index = 0; index < diffInLines; index++) {
      console.log();
    }
  });
  return chosenWeapon;
};

const ChooseWeapon = async (player, isAi) => {
  const weaponPromise = isAi ? AiChoose(player) : PlayerChoose(Weapons);
  const weapon = await weaponPromise;
  //   console.log("weapon", weapon);
  player.inventory.push(weapon);
  weapon.onGiven(player);
  console.log(
    `${player.color}${player.name
    } has chosen ${weapon.name.toUpperCase()}${resetText}`
  );
  console.log();
  await wait(2000);
};

module.exports = {
  ChooseWeapon,
  Weapons,
};
