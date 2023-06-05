const { startTurn } = require("./DayCounterLogic");
const { ParseResponseToOrders } = require("./PlayerQuestions");
const reader = require("readline-sync"); //npm install readline-sync

const gameContext = {
  manPower: 15000,
};

function AskCommands(gameContext) {
  const response = reader.question(
    `\nManpower: ${greenText}${
      gameContext.manPower
    }\n${resetText}\n{ORDERS}${yellowText}\n${playerOrders.join(
      "\n"
    )}${resetText} \nWhat are your orders? \n`
  );
  return ParseResponseToOrders(response);
}

startTurn(0, (turnNumber) => {
  console.log({ turnNumber });
  const command = AskCommands(gameContext);
  reader.question(
    "\n...as orders are carried out, the day draws to a close. \n Press Enter to continue:"
  );
});
