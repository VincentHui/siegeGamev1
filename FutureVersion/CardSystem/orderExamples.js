const { randomRangeInteger } = require("./randomLogic");
const { startTurn } = require("../DayCounterLogic");
const {
  getFromDeckByNames,
  getPlayedDeckEffects,
  Card,
} = require("../CardSystem/index");
const {
  AskForPlayerResponse,
  ParseResponseToOrders,
} = require("../PlayerQuestions");

const orderNames = ["Attack", "Recover"];

const orderDeck = [
  new Card({
    //attack
    name: orderNames[0],
    description: "Attack Order",
    playCard: (state) => {
      //calculations with state can be done here
      return { manPower: randomRangeInteger(-1000, 0) };
    },
  }),
  new Card({
    //recover
    name: orderNames[1],
    description: "Recover Order",
    playCard: (state) => {
      //calculations with state can be done here
      return { manPower: randomRangeInteger(-1000, 0) };
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

startTurn(0, (turnNumber) => {
  console.log({ turnNumber });
  const response = AskForPlayerResponse("choose Attack or Recover :");
  const orderFromResponse = ParseResponseToOrders(response, orderNames);
  const deckFromOrder = getFromDeckByNames(playerDecks.currentOrderDeck, [
    orderFromResponse,
  ]);
  const playedEffects = getPlayedDeckEffects(deckFromOrder);
  console.log(
    `General you ordered us to ${orderFromResponse} and as a result we ${
      Math.sign(playedEffects.manPower) > 0 ? "gained" : "lost"
    } ${playedEffects.manPower} men`
  );
  // console.log(playerDecks.resourceDeck);
});
