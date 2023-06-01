const { startTurn } = require("./DayCounterLogic");
const { AskCommands } = require("./PlayerQuestions");

const gameContext = {
  manPower: 15000,
};

startTurn(0, (turnNumber) => {
  console.log({ turnNumber });
  AskCommands(gameContext);
});
