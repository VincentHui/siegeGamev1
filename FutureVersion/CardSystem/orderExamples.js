const { randomRange } = require("./randomLogic");
const { startTurn } = require("../DayCounterLogic");
const { getFromDeckByNames } = require("../CardSystem/index");
const {
  AskForPlayerResponse,
  ParseResponseToOrders,
} = require("../PlayerQuestions");

const orderNames = ["Attack", "Recover"];

const orderDeck = [
  {
    //attack
    name: orderNames[0],
    effect: (state) => ({
      manpower: randomRange(-10000, 0),
    }),
  },
  {
    //recover
    name: orderNames[1],
    effect: (state) => ({
      manpower: randomRange(10000, 1),
    }),
  },
];

const playerDecks = {
  currentOrderDeck: orderDeck,
  resourceDeck: [
    {
      name: "initial invasion force",
      effect: (state) => ({
        manpower: 15000,
      }),
    },
  ],
};

startTurn(0, (turnNumber) => {
  console.log({ turnNumber });
  const response = AskForPlayerResponse("choose Attack or Recover :");
  const orderFromResponse = ParseResponseToOrders(response, orderNames);
  console.log(
    getFromDeckByNames(playerDecks.currentOrderDeck, [orderFromResponse])
  );
  //   console.log(command);
});
