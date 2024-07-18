const { PlayCards } = require("./Cards.js");
const { ask } = require("../common/askPromise.js");
const { wait } = require("../common/wait.js");
const { SelectCommandAI } = require("./ai.js");
const { Players, MAXTURN } = require("./Players.js");
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

const PlayerTakesTurn = async (player, Players, PlayCards) => {
  console.log(`${player.color}${player.name}'s turn`);
  let result = {};
  if (player.ai) {
    result = await SelectCommandAI(PlayCards, player, Players);
  }
  if (!player.ai) {
    result = await SelectCommandInteractive(PlayCards, player, Players);
  }
  return result;
};

const GetAllPlayersChosenCommands = async (players, commands) => {
  // const skippedPlayers = [];
  // for (let index = players.length - 1; index >= 0; index--) {
  //   if (players[index].initiative < 0) {
  //     console.log(
  //       `${players[index].color}${players[index].name}'s turn is skipped!${resetText}`
  //     );
  //     // skippedPlayers.push(...players.splice(index, 1));
  //   }
  // }

  const chosenCommands = [];
  for (let index = 0; index < players.length; index++) {
    const player = players[index];

    if (player.initiative < 0) {
      console.log(
        `${player.color}${player.name}'s turn is skipped!${resetText}`
      );
      player.skipped = true;
      continue;
    }

    if (player.mana < 0) {
      console.log(
        `${player.color}${player.name} has no mana!${resetText} ${player.color}${player.name} ${resetText}gains ${greenText}+4 mana${resetText}`
      );
      player.skipped = true;
      player.mana = player.mana + 4;
      continue;
    }

    const chosenPlayerCommand = await PlayerTakesTurn(
      player,
      players,
      commands
    );
    chosenCommands.push({ command: chosenPlayerCommand, player });
  }
  chosenCommands.sort(SortPlayerCommands);
  // players.push(...skippedPlayers);
  Players.filter((player) => {
    player.initiative++;
  });
  return chosenCommands;
};

const SortPlayerCommands = (a, b) => {
  if (a.command.name === "defend" && b.command.name !== "defend") {
    return -1; // a comes before b
  }
  if (a.command.name !== "defend" && b.command.name === "defend") {
    return 1; // b comes before a
  }
  return 0; // a and b are equal
};

module.exports = {
  PlayerTakesTurn,
  GetAllPlayersChosenCommands,
  SortPlayerCommands,
};
