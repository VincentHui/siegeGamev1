const { startTurn } = require("./DayCounterLogic");
const reader = require("readline-sync"); //npm install readline-sync

function getPlayerAnswer(dayturn) {
  console.log(`day : ${dayturn}`);
  let answer = reader.question("give me your answer: ");
  console.log(answer);
}

startTurn(0, (turnNumber) => {
  getPlayerAnswer(turnNumber);
});
