const { PlayCards } = require("./Cards.js");
const { ask } = require("../common/askPromise.js");
const { wait } = require("../common/wait.js");
const { SelectCommandAI } = require("./ai.js");
const { Players, MAXTURN, Team, YesNo } = require("./Players.js");
const {
  userArraySelect,
  playerCommandSelect,
  targetSelect,
  SelectYesorNo,
  SelectCommandInteractive,
} = require("./userinteract.js");

const {
  yellowText,
  redText,
  whiteText,
  pinkText,
  amazingColor,
  commonColor,
  trashColor,
  orangeText,
  greenText,
  softBlue,
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
  await wait(1500);
  console.log(`${player.color}${player.name}'s Turn`);
  await wait(1500);
  let result = {};
  if (player.ai) {
    result = await SelectCommandAI(PlayCards, player, Players);
  }
  if (!player.ai) {
    result = await SelectCommandInteractive(PlayCards, player, Players);
  }
  return result;
};

const PlayerChoosesTeam = async (player, Players, Team) => {
  await wait(500);
  console.log(`${player.color}${player.name} choosing Team...`);
  await wait(500);
  let result = {};
  if (player.ai) {
    result = await SelectCommandAI(Team, player, Players);
  }
  if (!player.ai) {
    result = await SelectCommandInteractive(Team, player, Players);
  }
  return result;
};

const GetAllPlayersChosenCommands = async (players, commands) => {
  const chosenCommands = [];
  for (let index = 0; index < players.length; index++) {
    const player = players[index];

    if (player.initiative < 0) {
      console.log(
        `${player.color}${player.name}'s turn is skipped!${resetText}`
      );
      if (player.hexes.wastrelshex > 0) {
        let wastreldmg = player.hexes.wastrelshex * 30;
        player.health = player.health - wastreldmg;
        console.log(
          `${redText}-Wastrels Wrath triggers! ${player.color}${player.name} ${resetText}loses ${redText}-${wastreldmg} HP.${resetText}`
        );
        player.hexes.wastrelshex = 0;
      }
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

const selectTeam = async (players, commands) => {
  const chosenTeam = [];
  for (let index = 0; index < players.length; index++) {
    const player = players[index];

    const chosenPlayerTeam = await PlayerChoosesTeam(player, players, commands);
    chosenTeam.push({ command: chosenPlayerTeam, player });
  }
  chosenTeam.sort(SortPlayerCommands);
  // players.push(...skippedPlayers);
  Players.filter((player) => {});
  return chosenTeam;
};

const YesNoQuestion = async (YesNo) => {
  await wait(500);
  result = await SelectYesorNo(YesNo);
  return result;
};

const YesOrNo = async (commands) => {
  const yesNoAnswer = [];
  for (let index = 0; index < 1; index++) {
    const chosenAnswer = await YesNoQuestion(commands);
    yesNoAnswer.push({ command: chosenAnswer });
  }
  // yesNoAnswer.sort(SortPlayerCommands);
  return yesNoAnswer;
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
  selectTeam,
  YesOrNo,
  GetAllPlayersChosenCommands,
  SortPlayerCommands,
};
