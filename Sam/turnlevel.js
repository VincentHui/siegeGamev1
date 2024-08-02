const { Eventcards } = require("./eventcards");
const { GameState, Roll } = require("./gamestate.js");
const { Progress } = require("./progress.js");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
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

function defenderDeploy(rl) {
  return new Promise((resolve) => {
    let remainingTroops = GameState.defender.Manpower;

    const deployToLocation = (index) => {
      if (index >= Progress.Map.length) {
        if (remainingTroops > 0) {
          console.log(
            `Warning: You have ${remainingTroops} unallocated troops. They will be evenly distributed among all locations.`
          );
          const locationsCount = Progress.Map.length;
          const troopsPerLocation = Math.floor(
            remainingTroops / locationsCount
          );
          const extraTroops = remainingTroops % locationsCount;

          Progress.Map.forEach((location, i) => {
            Progress.defenderAllocations[location] += troopsPerLocation;
            if (i < extraTroops) Progress.defenderAllocations[location]++;
          });
        }
        displayFinalAllocations();
        resolve();
        return;
      }

      const location = Progress.Map[index];
      rl.question(
        `Deploy how many troops to ${location}? (${remainingTroops} available, enter 0 to skip): `,
        (answer) => {
          const troops = Math.min(parseInt(answer), remainingTroops);
          if (isNaN(troops) || troops < 0) {
            console.log(
              "Invalid input. Please enter a valid number (0 or greater)."
            );
            deployToLocation(index);
            return;
          }

          Progress.defenderAllocations[location] = troops;
          remainingTroops -= troops;
          console.log(
            `Deployed ${troops} to ${location}. ${remainingTroops} troops remaining.`
          );

          deployToLocation(index + 1);
        }
      );
    };

    const displayFinalAllocations = () => {
      console.log("\nFinal troop allocations:");
      Progress.Map.forEach((location) => {
        console.log(
          `${location}: ${Progress.defenderAllocations[location]} troops`
        );
      });
    };

    deployToLocation(0);
  });
}

let location = Progress.playerPosition;
function updateMap(roll) {
  if (roll > 8) {
    currentlocation = location++;
    console.log(
      `${greenText}Your army has captured territory and moved to ${Progress.Map[currentlocation]}${resetText}`
    );
  } else {
    GameState.attacker.Manpower -= 500;
    GameState.attacker.Morale -= 3;
    console.log(
      `${redText}Your army remains at ${Progress.Map[location]}${resetText}`
    );
  }
}

async function Turnbase(turn, numberofturns, callback) {
  // Defender deploys troops at the start of the game
  await defenderDeploy(rl);

  for (let i = turn; i < numberofturns; i++) {
    console.log(`Turn ${i + 1}`);

    // Attacker allocates reserves each turn
    await attackerReserves(rl);

    callback();
    let roll = Roll();
    console.log("Roll result:", roll);

    updateMap(roll);

    console.log(
      "Attacker has",
      GameState.attacker.Manpower,
      "men, with",
      GameState.attacker.Reserves,
      "in reserve"
    );
    console.log("Attacker morale at", GameState.attacker.Morale);
    console.log("Defender morale at", GameState.defender.Morale);

    // Display current defender allocations
    console.log("Defender troop allocations:");
    for (let location of Progress.Map) {
      console.log(
        `${location}: ${Progress.defenderAllocations[location]} defenders`
      );
    }

    turn++;
  }
  rl.close();
}

function getRandomEventCard() {
  const randomIndex = Math.floor(Math.random() * Eventcards.length);
  return Eventcards[randomIndex];
}

function playEventCard() {
  const randomCard = getRandomEventCard();
  console.log(`Playing: ${randomCard.name} - ${randomCard.description}`);
  const effect = randomCard.effect();
  console.log({ effect });
}

Turnbase(2, 20, playEventCard);
// -------------------------------------------------------------------------
