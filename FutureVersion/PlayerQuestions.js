const playerOrders = ["Attack", "Engineering", "Espionage", "Recover"];
const reader = require("readline-sync"); //npm install readline-sync
const { yellowText, redText, greenText, resetText } = require("./Colors");
const { Card } = require("./CardSystem");

/**
 * AskForPlayerResponse is a function that takes in an askStatement as an argument and returns the response from the reader.question() method
 * @param {String} askStatement - The statement to be asked to the player
 * @returns {String} - The response from the reader.question() method
 */
const AskForPlayerResponse = (askStatement) => {
  return reader.question(askStatement);
};
/**
 * This function takes in a response and a list of orders, filters through the orders to find one that matches the response, and returns it.
 * If no order is found, it prompts the user for another response.
 * @param {string} response The response to parse
 * @param {Card[]} orders The array of orders to choose from
 * @returns {string} The chosen order
 */
const ParseResponseToOrders = (response, orders) => {
  // convert response to upper case string
  const upperCase = response.toUpperCase();

  // filter orders to those that match the response
  const chosenOrders = orders.filter(
    (order) => order.toUpperCase() === upperCase
  );

  // if there are no matches, prompt user for new response
  if (chosenOrders.length !== 1) {
    const newResponse = reader.question(
      "General I don't understand... Please give me orders again \n"
    );
    ParseResponseToOrders(newResponse);
  }

  // if there is only one match, log the order and return it
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
  playerOrders,
};
