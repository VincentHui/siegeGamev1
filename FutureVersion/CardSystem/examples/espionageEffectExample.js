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
  console.log({ globalState });

  // Get an order card name from the order deck
  const orderCardName = GetOrderFromOrderDeck(orderDeck);
  console.log(`General you ordered us to ${orderCardName}...`);
  const orderCard = GetCardFromDeckByName(orderCardName, orderDeck);

  // Determine the type of order card and execute the corresponding action
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

  // Check if the player has won or lost the game
  if (globalState.manPower <= 0) {
    console.log("YOU HAVE LOST");
    return true;
  }
  if (globalState.defences <= 0) {
    console.log("YOU HAVE WON");
    return true;
  }
});
