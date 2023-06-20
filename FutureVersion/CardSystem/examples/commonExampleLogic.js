const { getNamesOfCardsInDeck } = require("../index");
const {
  AskForPlayerResponse,
  ParseResponseToOrders,
} = require("../../PlayerQuestions");

function GetOrderFromOrderDeck(orderDeck) {
  const possibleOrdersArray = getNamesOfCardsInDeck(orderDeck);
  const orderNamesWithNewline = possibleOrdersArray.join("\n");
  const response = AskForPlayerResponse(
    `choose \n${orderNamesWithNewline} \n:`
  );

  const orderFromResponse = ParseResponseToOrders(
    response,
    possibleOrdersArray
  );

  return orderFromResponse;
}

module.exports = {
  GetOrderFromOrderDeck,
};
