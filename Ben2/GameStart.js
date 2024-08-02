const { pubsub } = require("../common/pubSub.js");
const { ask } = require("../common/askPromise.js");
const { wait } = require("../common/wait.js");
const { Players, gamestate, Team, YesNo } = require("./Players.js");
const { PlayCards } = require("./Cards.js");
const {
  GetAllPlayersChosenCommands,
  selectTeam,
  YesOrNo,
} = require("./commands.js");
const { SelectCommandAI } = require("./ai.js");
const { startLoader } = require("../common/loader.js");
const {
  turnLoader,
  teamLoader,
  initialLoader,
  dotLoader,
} = require("./turnloader.js");
const readline = require("readline");
const {
  userArraySelect,
  playerCommandSelect,
  passiveSelect,
  targetSelect,
  SelectCommandInteractive,
} = require("./userinteract.js");

const {
  yellowText,
  softBlue,
  redText,
  amazingColor,
  commonColor,
  trashColor,
  pinkText,
  orangeText,
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
let turn = 0;
const GameLoop = async () => {
  await ask("Enter input to start");

  console.log(`${yellowText}Do you want to turn on teams?`);

  const chosenAnswer = await YesOrNo(YesNo);
  for (cmd of chosenAnswer) {
    console.log(`You said ${cmd.command.name} to Teams!`);
    if (cmd.command.name === "yes") {
      console.log(`${boldText}${yellowText}`);
      await teamLoader(2000);
      readline.moveCursor(process.stdout, 0, -1);
      console.log(`---TEAM SELECT---${resetText}`);
      await wait(1000);
      const chosenTeam = await selectTeam(Players, Team);
      console.log();
      for (cmd of chosenTeam) {
        console.log(
          `${cmd.player.color}${cmd.player.name}${resetText} joins ${cmd.command.color}${cmd.command.name}${resetText}`
        );
        cmd.player.team = cmd.command.name;
        cmd.player.color = cmd.command.color;
        await wait(500);
      }
    } else;
  }

  // const chosenTeam = await selectTeam(Players, Team);
  // console.log();
  // for (cmd of chosenTeam) {
  //   console.log(
  //     `${cmd.player.color}${cmd.player.name}${resetText} joins ${cmd.command.color}${cmd.command.name}${resetText}`
  //   );
  //   cmd.player.team = cmd.command.name;
  //   cmd.player.color = cmd.command.color;
  //   await wait(500);
  // }

  pubsub.publish("start");

  while (turn < gamestate.MAXTURN) {
    turn++;
    console.log(`${boldText}${yellowText}`);
    await turnLoader(1000);
    readline.moveCursor(process.stdout, 0, -1);
    console.log(`---TURN ${turn}---`);
    await wait(1000);
    console.log(`${resetText}`);

    const playerNames = Players.map((player) => {
      return `${player.color}${player.name}${resetText}`;
    }).join("      ");

    console.log(playerNames);

    const playerHealth = Players.map((player) => {
      return `HP: ${player.health}`;
    }).join(" | ");

    console.log(playerHealth);

    const playerMana = Players.map((player) => {
      return `MP: ${player.mana}${resetText}`;
    }).join(" | ");

    console.log(playerMana);

    Players.forEach((player) => {
      if (player.hexes.bloodhex > 0) {
        console.log(
          `${player.color}${player.name}${resetText} is${redText} bleeding x${player.hexes.bloodhex}${resetText}`
        );
      }
    });

    Players.forEach((player) => {
      if (player.hexes.wastrelshex > 0) {
        console.log(
          `${player.color}${player.name}${resetText} has${redText} x${player.hexes.wastrelshex} stacks of Wastrels Wrath${resetText}`
        );
      }
    });

    // pubsub.publish(`Bleeding +1 stack`);

    // pubsub.publish(
    //   `${Players.forEach((player) => {
    //     if (player.hexes.bloodhex > 0) {
    //     }
    //   })}`
    // );

    // const playerTeam = Players.map((player) => {
    //   return `Team: ${player.team}${resetText}`;
    // }).join(" | ");

    // console.log(playerTeam);

    // Players.filter((player) => {
    //   console.log(
    //     `${player.color}-${player.name}- ${resetText}\nHP: ${player.health} \nMP: ${player.mana} ${resetText}\n`
    //   );
    // });

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
      console.log(
        `${cmd.player.color}${cmd.player.name}${resetText} uses: ${abilityText}${cmd.command.name}${resetText}`
      );
      await wait(1500);
      await cmd.command.effect(cmd.player);
      await wait(2000);
    }

    Players.forEach((player) => {
      if (player.hexes.bloodhex > 0) {
        let bloodhexdmg = player.hexes.bloodhex * 5;
        player.health -= bloodhexdmg;
        console.log(
          `${player.color}${player.name} ${resetText}is ${redText}Bleeding! -${bloodhexdmg} HP.${resetText}`
        );
      }
    });
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
        console.log(`${yellowText}${winningTeam} has won!`);
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
    if (turn >= gamestate.MAXTURN) {
      pubsub.publish("max turn reached");
      process.exit();
    }
  }
};
GameLoop();
