const { Card, DuplicateCard } = require("../index");
const { startTurn } = require("../../DayCounterLogic");
const { MakePlayerOrdersFromOrderDeck } = require("./common");
const { randomRangeInteger } = require("../randomLogic");

const orderDeck = [
  new Card({
    //attack
    name: "Attack",
    description: "Attack Order",
    playCard: (state) => {
      const esponiageManpowerModifier =
        state.espionageLevel === undefined ? 0 : state.esponiageLevel;
      //calculations with state can be done here
      return {
        manPower: randomRangeInteger(-5000, -1000),
        esponiageManpowerModifier,
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
    name: "Espoinage",
    description: "gather intel and find weakness",
    playCard: (state) => {},
  }),
];

const EspionageDeck = [
  new Card({
    name: "increase espoinage level",
    description: "increase espoinage levels for both modifer and other bonuses",
    effect: {
      esponiage: 1,
    },
  }),
  new Card({
    name: "find the collaborators",
    description: "find collaborators in the field and increase manpower",
    playCard: (state) => {
      return { manPower: randomRangeInteger(0, 500) };
    },
  }),
  ...DuplicateCard(
    new Card({
      name: "no espoinage bonus",
      description: "no bonus",
    }),
    5
  ),
];

startTurn(0, (turnNumber) => {
  // Log the current turn number
  console.log({ turnNumber });
  const { ordersPlayedEffects, orderFromResponse } =
    MakePlayerOrdersFromOrderDeck(orderDeck);

  //   // Log the result of the order
  //   console.log(
  //     `General you ordered us to ${orderFromResponse} and as a result we ${
  //       Math.sign(ordersPlayedEffects.manPower) > 0 ? "gained" : "lost"
  //     } ${ordersPlayedEffects.manPower} men`
  //   );
});
