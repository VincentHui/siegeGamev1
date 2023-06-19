const { randomRangeInteger } = require("../randomLogic");
const { startTurn } = require("../../DayCounterLogic");
const { Card, getDeckEffects, addToTopOfDeck } = require("../index");
const { MakePlayerOrdersFromOrderDeck } = require("../examples/common");
const {
  AskForPlayerResponse,
  ParseResponseToOrders,
} = require("../../PlayerQuestions");

const orderDeck = [
  new Card({
    //attack
    name: "Attack",
    description: "Attack Order basic",
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
  resourceDeck: [
    new Card({
      name: "initial invasion force",
      effect: { manPower: 15000 },
    }),
  ],
};

startTurn(0, (turnNumber) => {
  // Log the current turn number
  console.log({ turnNumber });
  const { ordersPlayedEffects, orderFromResponse } =
    MakePlayerOrdersFromOrderDeck(orderDeck);

  // Log the result of the order
  console.log(
    `General you ordered us to ${orderFromResponse} and as a result we ${
      Math.sign(ordersPlayedEffects.manPower) > 0 ? "gained" : "lost"
    } ${ordersPlayedEffects.manPower} men`
  );

  // Log the current effects of the resource deck
  console.log(getDeckEffects(playerDecks.resourceDeck));

  // Add a card to the top of the resource deck
  playerDecks.resourceDeck = addToTopOfDeck(playerDecks.resourceDeck, [
    new Card({
      name: "manPowerChange",
      description: "card which will change the manpower amount",
      effect: { manPower: ordersPlayedEffects.manPower },
    }),
  ]);

  // Get the manpower left and store it in the variable 'manpowerLeft'
  const manpowerLeft = getDeckEffects(playerDecks.resourceDeck).manPower;

  // Log the manpower left
  console.log(manpowerLeft);

  // If there is no manpower left, log a message and return true to end the game
  if (manpowerLeft < 0) {
    console.log("we have no men left");
    return true;
  }
});

test = () => {
  console.log();
};

module.exports = {
  MakePlayerOrdersFromOrderDeck,
};
