const {
  Card,
  DuplicateCard,
  GetCardFromDeckByName,
  shuffleDeck,
  drawOneCardFromTopOfDeck,
} = require("../index");
const { startTurn } = require("../../DayCounterLogic");
const { GetOrderFromOrderDeck } = require("./commonExampleLogic");
const { randomRangeInteger } = require("../randomLogic");

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
      espionageLevel: 1,
    },
  }),
  //   new Card({
  //     name: "find the collaborators",
  //     description: "find collaborators in the field and increase manpower",
  //     playCard: (state) => {
  //       return { manPower: randomRangeInteger(0, 500) };
  //     },
  //   }),
  ...DuplicateCard(
    new Card({
      name: "no espoinage bonus",
      description: "no bonus",
    }),
    2
  ),
];

const globalState = {
  espionageLevel: 0,
  manPower: 15000,
  defences: 50,
};

function Espionage(espionageCard) {
  console.log(espionageCard);
  if (espionageCard.name === "increase espoinage level") {
    globalState.espionageLevel += espionageCard.effect.espionageLevel;
  }
}

function Attack(attackCard) {
  const { manPower, esponiageModifier } = attackCard.playCard(globalState);
  console.log(
    `General you ordered us to attack and as a result we lost ${manPower} men`
  );
  globalState.defences -= 1;
  console.log(`defences reduced to ${globalState.defences}`);
  globalState.manPower += manPower;
  if (esponiageModifier > 0) {
    console.log("we use our intel to our advantage!");
    globalState.defences -= esponiageModifier;
    console.log(`defences reduced to ${globalState.defences}`);
  }
}

function Recover(recoverCard) {
  const { manPower } = recoverCard.playCard();
  globalState.manPower += manPower;
  console.log(`we have recovered ${manPower}`);
  //   console.log({ manPower, esponiageManpowerModifier });
}

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

  if (globalState.manPower <= 0) {
    console.log("YOU HAVE LOST");
    return true;
  }
  if (globalState.defences <= 0) {
    console.log("YOU HAVE WON");
    return true;
  }
});
