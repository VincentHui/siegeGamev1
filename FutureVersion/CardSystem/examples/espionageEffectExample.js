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
    name: "Espionage",
    description: "gather intel and find weakness",
    playCard: (state) => {},
  }),
];

const EspionageDeck = [
  new Card({
    name: "increase espionage level",
    description: "increase espionage levels for both modifer and other bonuses",
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
      name: "no espionage bonus",
      description: "no bonus",
    }),
    2
  ),
  ...DuplicateCard(
    new Card({
      name: "Test",
      description: "no bonus",
      effect: console.log("WALALALA"),
    }),
    299
  ),
];

// Global state object containing espionage level, man power and defences
const globalState = {
  espionageLevel: 0, // Espionage level is set to 0
  manPower: 15000, // Man power is set to 15000
  defences: 50, // Defences is set to 50
};
// This function increases the espionage level based on an input card
function Espionage(espionageCard) {
  console.log(espionageCard); // Log the espionage card for reference
  if (espionageCard.name === "increase espoinage level") {
    // Check if the name of the card is 'increase espionage level'
    globalState.espionageLevel += espionageCard.effect.espionageLevel; // Increase the espionage level by the card's effect value
  }
}

// Attack function takes in an attackCard object as a parameter
function Attack(attackCard) {
  // Destructure manPower and esponiageModifier from the playCard method of the attackCard object
  const { manPower, esponiageModifier } = attackCard.playCard(globalState);
  // Log the number of men lost in the attack
  console.log(
    `General you ordered us to attack and as a result we lost ${manPower} men`
  );
  // Reduce global state defences by 1
  globalState.defences -= 1;
  // Log the updated defences
  console.log(`defences reduced to ${globalState.defences}`);
  // Add the manPower lost to the global state manPower
  globalState.manPower += manPower;
  // If the espionage modifier is greater than 0, log that intel was used to advantage
  if (esponiageModifier > 0) {
    console.log("we use our intel to our advantage!");
    // Reduce global state defences by the espionage modifier
    globalState.defences -= esponiageModifier;
    // Log the updated defences
    console.log(`defences reduced to ${globalState.defences}`);
  }
}

// Recover function takes in a recoverCard object as a parameter
function Recover(recoverCard) {
  // Destructure manPower from the playCard method of the recoverCard object
  const { manPower } = recoverCard.playCard();
  // Add the manPower recovered to the global state manPower
  globalState.manPower += manPower;
  // Log the amount of manPower recovered
  console.log(`we have recovered ${manPower}`);
  // Uncomment the following line to log the manPower and espionageModifier values
  // console.log({ manPower, esponiageManpowerModifier });
}

// Start a turn for the given number of turns
startTurn(0, (turnNumber) => {
  // Log the turn number and global state
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
