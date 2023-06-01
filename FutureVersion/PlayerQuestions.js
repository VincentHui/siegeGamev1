// const yellowText = "\x1b[33m";
// const redText = "\x1b[31m";
// const greenText = "\x1b[32m";
// const resetText = "\x1b[0m";
const playerOrders = ["Attack", "Engineering", "Espionage", "Recover"];
const reader = require("readline-sync"); //npm install readline-sync
const { yellowText, redText, greenText, resetText } = require("./Colors");

function AskCommands(gameContext) {
  const response = reader.question(
    `\nManpower: ${greenText}${
      gameContext.manPower
    }\n${resetText}\n{ORDERS}${yellowText}\n${playerOrders.join(
      "\n"
    )}${resetText} \nWhat are your orders? \n`
  );
  ParseResponse(response);
}

const ParseResponse = (response) => {
  const upperCase = response.toUpperCase();
  const chosenOrders = playerOrders.filter(
    (order) => order.toUpperCase() === upperCase
  );

  if (chosenOrders.length !== 1) {
    const newResponse = reader.question(
      "General I don't understand... Please give me orders again \n"
    );
    ParseResponse(newResponse);
  }

  if (chosenOrders.length === 1) {
    console.log(
      `General, you ordered ${yellowText}${chosenOrders[0]}.${resetText} \n`
    );
  }
};

module.exports = {
  AskCommands,
};
