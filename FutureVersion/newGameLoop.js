const { startTurn } = require("./DayCounterLogic");
const { ParseResponseToOrders, playerOrders } = require("./PlayerQuestions");
const reader = require("readline-sync"); //npm install readline-sync
const { greenText, yellowText, resetText } = require("./Colors");

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

/* Turn algorithm

When the player orders and finishes moving his units
The turn ends and a new turn begins

there are 10 turns in one day

Order -> Execution of order -> end of turn -> turn count updated -> Start new turn

Logic
Create an variable whos value is an object
Object contains variable 'turn' 
which updates everytime a player orders and actions are completed

Function 'turn update' 
Increases variable 'turn' by 1 after actions are completed

At the beginning of player orders, display 'turn' to player on screen or terminal



*/
