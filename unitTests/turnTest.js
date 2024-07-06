let critcounter = 0;
const { diceRoll } = require("../common/dice");

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

function manyTurns(currentTurn, numberofTurns, callback, endGame) {
  if (currentTurn > numberofTurns - 1) {
    endGame(stats);
    return;
  } else currentTurn < numberofTurns;
  currentTurn = currentTurn + 1;

  console.log("~Attempt " + currentTurn + "~");

  callback(turn);
  manyTurns(currentTurn, numberofTurns, callback, endGame);
}

const turn = () => {
  console.log("Turn");
};

const stats = () => {
  console.log("No more Attempts! Game Over!");
  console.log("{Statistics}:");
  console.log("{Critical Hits}: " + critcounter);
  if (critcounter > 4) {
    console.log(
      "thatsss crazyy brother you got a ton of sixes you are super lucky and deserve the world"
    );
  }
  if (critcounter === 0) {
    console.log(
      "thatsss crazyy brother you got shit luck better luck next time hahahahahah"
    );
  }
  return;
};
// const info = (threshold, criticalHitCount) => {
//   // for (let i = 0; i < threshold; i++);

//   return (criticalHitCount) => {
//     criticalinfo = () => {
//       criticalHitCount + 1;
//       consolecrits = () => {
//         console.log(criticalHitCount);
//       };
//     };
//   };

//   if (threshold > 0) {
//     console.log(criticalHitCount);
//   }
// };
const crits = () => {};

manyTurns(
  0,
  10,
  (turn) => {
    let rollResult = diceRoll(2, 6);
    // let rollResult = diceRoll.result;
    // let diceResult = [];
    console.log(rollResult);
    rollResult.forEach((element) => {
      // let rolladd = element + para;
      if (element === 6) {
        crits();
        console.log("You rolled a critical hit of 6!");
        critcounter = critcounter + 1;
      } else return;
    });

    // if (rollResult[i] === 1) {
    //   console.log("double");
    // } else return;

    // rollResult.forEach((x, y) => {
    //   if ((result = [1, 1])) {
    //     console.log("DOUBLE 1");
    //   } else return;
    // });
  },
  stats
);
