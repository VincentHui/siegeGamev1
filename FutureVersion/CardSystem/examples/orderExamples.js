const { randomRangeInteger } = require("../randomLogic");
const { startTurn } = require("../../DayCounterLogic");
const {
  getFromDeckByNames,
  getPlayedDeckEffects,
  Card,
  getDeckEffects,
  addToTopOfDeck,
  getNamesOfCardsInDeck,
} = require("../index");
const {
  AskForPlayerResponse,
  ParseResponseToOrders,
} = require("../../PlayerQuestions");

// const orderNames = ["Attack", "Recover"];

const orderDeck = [
  new Card({
    //attack
    name: "Attack",
    description: "Attack Order",
    playCard: (state) => {
      //calculations with state can be done here
      return { manPower: randomRangeInteger(-5000, -1000) };
    },
  }),
  new Card({
    //recover
    name: "Recover",
    description: "Recover Order",
    playCard: (state) => {
      //calculations with state can be done here
      return { manPower: randomRangeInteger(0, 500) };
    },
  }),
];

const playerDecks = {
  currentOrderDeck: orderDeck,
  resourceDeck: [
    new Card({
      name: "initial invasion force",
      effect: { manPower: 15000 },
    }),
  ],
};

const MakePlayerOrders = (PlayerDecks, OrderDeck, OnOrdersGivenCallBack) => {
  const orderNames = getNamesOfCardsInDeck(OrderDeck);
  const orderNamesWithNewline = orderNames.join("\n");
  // Ask the player for a response and store it in the variable 'response'
  // console.log(`choose \n ${orderNamesWithNewline} :`);
  const response = AskForPlayerResponse(
    `choose \n${orderNamesWithNewline} \n:`
  );

  // Parse the response to orders and store it in the variable 'orderFromResponse'
  const orderFromResponse = ParseResponseToOrders(response, orderNames);

  // Get the deck from the order and store it in the variable 'deckFromOrder'
  const deckFromOrder = getFromDeckByNames(PlayerDecks.currentOrderDeck, [
    orderFromResponse,
  ]);

  // Get the played effects from the deck and store it in the variable 'playedEffects'
  const ordersPlayedEffects = getPlayedDeckEffects(deckFromOrder);

  OnOrdersGivenCallBack(orderFromResponse, ordersPlayedEffects);

  // Log the result of the order
  console.log(
    `General you ordered us to ${orderFromResponse} and as a result we ${
      Math.sign(ordersPlayedEffects.manPower) > 0 ? "gained" : "lost"
    } ${ordersPlayedEffects.manPower} men`
  );

  // Log the current effects of the resource deck
  console.log(getDeckEffects(PlayerDecks.resourceDeck));

  // Add a card to the top of the resource deck
  PlayerDecks.resourceDeck = addToTopOfDeck(PlayerDecks.resourceDeck, [
    new Card({
      name: "manPowerChange",
      description: "card which will change the manpower amount",
      effect: { manPower: ordersPlayedEffects.manPower },
    }),
  ]);

  // Get the manpower left and store it in the variable 'manpowerLeft'
  const manpowerLeft = getDeckEffects(PlayerDecks.resourceDeck).manPower;

  // Log the manpower left
  console.log(manpowerLeft);

  // If there is no manpower left, log a message and return true
  if (manpowerLeft < 0) {
    console.log("we have no men left");
    return true;
  }
};

startTurn(0, (turnNumber) => {
  // Log the current turn number
  console.log({ turnNumber });
  const gameIsOver = MakePlayerOrders(playerDecks, orderDeck);
  return gameIsOver;
});

module.exports = {
  MakePlayerOrders,
};
