const { randomRangeInteger } = require("../randomLogic");
const { startTurn } = require("../../DayCounterLogic");
const {
  Card,
  getDeckEffects,
  addToTopOfDeck,
  GetCardFromDeckByName,
} = require("../index");
const { GetOrderFromOrderDeck } = require("./commonExampleLogic");

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
  console.log({ turnNumber });
  const orderCardName = GetOrderFromOrderDeck(orderDeck);
  const orderCard = GetCardFromDeckByName(orderCardName, orderDeck);
  const ordersPlayedEffects = orderCard.playCard();
  console.log("past manpower", getDeckEffects(playerDecks.resourceDeck));

  // Log the result of the order
  console.log(
    `General you ordered us to ${orderCardName} and as a result we ${
      Math.sign(ordersPlayedEffects.manPower) > 0 ? "gained" : "lost"
    } ${ordersPlayedEffects.manPower} men`
  );

  // Add a card to the top of the resource deck
  playerDecks.resourceDeck = addToTopOfDeck(playerDecks.resourceDeck, [
    new Card({
      name: "manPowerChange",
      description: "card which will change the manpower amount",
      effect: { manPower: ordersPlayedEffects.manPower },
    }),
  ]);

  // Get the manpower left and store it in the variable 'manpowerLeft'
  const manpowerLeft = Math.max(
    getDeckEffects(playerDecks.resourceDeck).manPower,
    0
  );

  // Log the manpower left
  console.log({ manpowerLeft }, "\n\n", "* * * * * * * *", "\n");

  // If there is no manpower left, log a message and return true to end the game
  if (manpowerLeft <= 0) {
    console.log("we have no men left");
    return true;
  }
});

module.exports = {
  MakePlayerOrdersFromOrderDeck,
};
