const { getNamesOfCardsInDeck } = require("../index");
const {
  AskForPlayerResponse,
  ParseResponseToOrders,
} = require("../../PlayerQuestions");

/**
 * This function takes an orderDeck as an argument
 * and returns an orderFromResponse based on user input.
 * @param {Card[]} orderDeck - The deck of orders from which to choose
 * @returns {string} The order chosen by the player
 */
function GetOrderFromOrderDeck(orderDeck) {
  // Get an array of possible orders from the orderDeck
  const possibleOrdersArray = getNamesOfCardsInDeck(orderDeck);

  // Join the possible orders into a string with newlines
  const orderNamesWithNewline = possibleOrdersArray.join("\n");

  // Ask the player to choose an order from the list
  const response = AskForPlayerResponse(
    `choose \n${orderNamesWithNewline} \n:`
  );

  // Parse the player's response and return the corresponding order
  const orderFromResponse = ParseResponseToOrders(
    response,
    possibleOrdersArray
  );

  return orderFromResponse;
}

module.exports = {
  GetOrderFromOrderDeck,
};
