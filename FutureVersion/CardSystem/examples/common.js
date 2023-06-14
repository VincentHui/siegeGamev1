const {
  getFromDeckByNames,
  getPlayedDeckEffects,
  getNamesOfCardsInDeck,
} = require("../index");
const {
  AskForPlayerResponse,
  ParseResponseToOrders,
} = require("../../PlayerQuestions");

function MakePlayerOrdersFromOrderDeck(playersOrderDeck, state = {}) {
  const orderNames = getNamesOfCardsInDeck(playersOrderDeck);
  const orderNamesWithNewline = orderNames.join("\n");
  // Ask the player for a response and store it in the variable 'response'
  // console.log(`choose \n ${orderNamesWithNewline} :`);
  const response = AskForPlayerResponse(
    `choose \n${orderNamesWithNewline} \n:`
  );

  // Parse the response to orders and store it in the variable 'orderFromResponse'
  const orderFromResponse = ParseResponseToOrders(response, orderNames);

  // Get the deck from the order and store it in the variable 'deckFromOrder'
  const deckFromOrder = getFromDeckByNames(playersOrderDeck, [
    orderFromResponse,
  ]);

  // Get the played effects from the deck and store it in the variable 'playedEffects'
  const ordersPlayedEffects = getPlayedDeckEffects(deckFromOrder, state);

  return { ordersPlayedEffects, orderFromResponse };
}
module.exports = {
  MakePlayerOrdersFromOrderDeck,
};
