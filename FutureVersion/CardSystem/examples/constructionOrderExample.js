const { startTurn } = require("../../DayCounterLogic");
const { GetOrderFromOrderDeck } = require("./commonExampleLogic");

const orderDeck = [
  new Card({
    //attack
    name: "Attack",
    description: "Attack Order",
    playCard: (state) => {
      const esponiageModifier =
        state.espionageLevel === undefined ? 0 : state.espionageLevel;
      //calculations with state can be done here
      return {
        manPower: randomRangeInteger(-5000, -1000),
        esponiageModifier,
      };
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
  new Card({
    name: "Construction",
    description: "Give options to construct",
    playCard: (state) => {},
  }),
];

const globalState = {
  constructionLevel: 0,
  manPower: 15000,
  defences: 50,
};

startTurn(0, (turnNumber) => {
  // Log the current turn number
  console.log({ turnNumber });
  console.log({ globalState });

  const orderCardName = GetOrderFromOrderDeck(orderDeck);
  console.log(`General you ordered us to ${orderCardName}...`);
  const orderCard = GetCardFromDeckByName(orderCardName, orderDeck);

  if (orderCard.name === "Espoinage") {
    const espionageCard = drawOneCardFromTopOfDeck(shuffleDeck(EspionageDeck));
    Espionage(espionageCard);
  }
  if (orderCard.name === "Attack") {
    Attack(orderCard);
  }
  if (orderCard.name === "Recover") {
    Recover(orderCard);
  }
});
