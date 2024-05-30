// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let turn = 0;
// function turnstart() {
//   console.log(turn);
// }
// // if (turn < 10) {turn + 1}, (turnstart),

// // function turnTest(turnnumber) {
// //   for (let i = 0; i < 20; i++) {
// //     return;
// //   }
// // // }

// // turnTest(turn);

// // readline.question("", () => {
// //   console.log(turn);
// // });
// // console.log(turn);
// turnstart;

// function oneTurn(turnNumber, numberofTurns) {
//   console.log("Turn");
//   console.log(turnNumber + 1);
// }

function manyTurns(firstTurn, numberofTurns) {
  if (firstTurn > numberofTurns - 1) {
    console.log("no more turns");
    return;
  } else firstTurn < numberofTurns;
  firstTurn = firstTurn + 1;
  console.log("Turn");
  console.log(firstTurn);
  manyTurns(firstTurn, numberofTurns);
}

manyTurns(0, 10);
