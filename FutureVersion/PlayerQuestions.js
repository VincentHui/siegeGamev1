const playerOrders = ["Attack", "Engineering", "Espionage", "Recover"];
const reader = require("readline-sync"); //npm install readline-sync
const { yellowText, redText, greenText, resetText } = require("./Colors");

const AskForPlayerResponse = (askStatement) => {
  return reader.question(askStatement);
};

const ParseResponseToOrders = (response, orders = playerOrders) => {
  const upperCase = response.toUpperCase();
  const chosenOrders = orders.filter(
    (order) => order.toUpperCase() === upperCase
  );

  if (chosenOrders.length !== 1) {
    const newResponse = reader.question(
      "General I don't understand... Please give me orders again \n"
    );
    ParseResponseToOrders(newResponse);
  }

  if (chosenOrders.length === 1) {
    console.log(
      `General, you ordered ${yellowText}${chosenOrders[0]}.${resetText} \n`
    );
    return chosenOrders[0];
  }
};

module.exports = {
  AskForPlayerResponse,
  ParseResponseToOrders,
};
