const { pubsub } = require("../common/pubSub.js");
const { ask } = require("../common/askPromise.js");
const { wait } = require("../common/wait.js");
const { Players, MAXTURN } = require("./Players.js");
const { PlayCards } = require("./Cards.js");
const { GetAllPlayersChosenCommands } = require("./commands.js");
const { SelectCommandAI } = require("./ai.js");
const {
  userArraySelect,
  playerCommandSelect,
  targetSelect,
  SelectCommandInteractive,
} = require("./userinteract.js");

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

const GameLoop = async () => {
  await ask("Enter input to start");
  pubsub.publish("start");

  let turn = 0;
  while (turn < MAXTURN) {
    turn++;
    console.log({ turn });
    Players.filter((player) => {
      console.log(
        `${player.color}-${player.name}- ${resetText}\nHP: ${player.health} \nMP: ${player.mana} ${resetText}\n`
      );
    });

    // Players.filter((player) => {
    //   const playerskipped = player.initiative < 0;
    //   if (playerskipped)
    //     console.log(
    //       `${player.color}${player.name}'s ${resetText} turn is skipped!${resetText}`
    //     );
    //   return playerskipped;
    // });

    const chosenCommands = await GetAllPlayersChosenCommands(
      Players,
      PlayCards
    );
    console.log();
    for (cmd of chosenCommands) {
      console
        .log
        // `${cmd.player.color}${cmd.player.name} chooses ${cmd.command.name}${resetText}`
        ();
      await cmd.command.effect(cmd.player);
      await wait(1000);
    }
    for (player of Players) {
      player.defense = 0;
      player.target = null;
    }

    Players.filter((player) => {
      const deadPlayers = [];
      for (let index = Players.length - 1; index >= 0; index--) {
        if (Players[index].health < 1) {
          console.log(
            `${Players[index].name} has fallen to their wounds... ${resetText}`
          );
          deadPlayers.push(...Players.splice(index, 1));
        }
      }
    });
    await wait(2000);
    if (Players.length === 1) {
      console.log();
      console.log(
        `${Players[0].color}${Players[0].name}${resetText} is the last one standing...`
      );
      await wait(2000);
      process.exit();
    }

    function getUniqueTeams(Players) {
      return new Set(Players.map((player) => player.team));
    }

    async function checkForWinner(Players) {
      const uniqueTeams = getUniqueTeams(Players);
      if (uniqueTeams.size === 1) {
        const winningTeam = [...uniqueTeams][0];
        console.log();
        console.log(`${yellowText}Team ${winningTeam} has won!`);
        process.exit();
      }
    }
    checkForWinner(Players);
    if (Players.length === 0) {
      console.log();
      console.log(`all have failed the trial of magic...`);
      await wait(2000);
      process.exit();
    }
    if (turn >= MAXTURN) {
      pubsub.publish("max turn reached");
      process.exit();
    }
  }
};
GameLoop();
