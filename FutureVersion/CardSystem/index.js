const { getShuffledNumberArray, shuffleArray } = require("./randomLogic");
/**
 * Merges objects in an array into one object
 * @param {Object[]} data - An array of objects to be merged
 */
const mergeObjects = (data) => {
  const result = {}; //(1)

  data.forEach((basket) => {
    //(2)
    for (let [key, value] of Object.entries(basket)) {
      //(3)
      if (result[key]) {
        //(4)
        result[key] += value; //(5)
      } else {
        //(6)
        result[key] = value;
      }
    }
  });
  return result; //(7)
};

const getDeckEffects = (aDeck) => {
  const meregedEffects = mergeObjects(
    aDeck.map((card) => ({ ...card.effect }))
  );
  return meregedEffects;
};

const getPlayedDeckEffects = (aDeck) => {
  const meregedEffects = mergeObjects(
    aDeck.map((card) => ({ ...card.playCard() }))
  );
  return meregedEffects;
};

const deckEffectsToString = (aDeck) => {
  const effect = getDeckEffects(aDeck);
  let result = "";
  for (const [key, value] of Object.entries(effect)) {
    result += `${key}:${value} `;
  }
  return result;
};

const shuffleDeck = (deckToShuffle) => shuffleArray(deckToShuffle);

/**
 * This function takes in an array of cards (deckToDrawFromArray) and a number of cards to draw (numberOfCardsToDraw).
 * It then returns an object containing the remaining deck and the cards that were drawn from the top.
 * We return these new values and let the caller decide how to change whats give not the function
 * @param {array<Card>} deckToDrawFromArray An array of cards from which to draw.
 * @param {number} numberOfCardsToDraw The number of cards to draw from the top of the deck.
 * @returns {object} An object with two properties: remainingDeck and cardsDrawn.
 */
const drawFromTopOfDeck = (deckToDrawFromArray, numberOfCardsToDraw) => {
  // Check if there are no cards in the deck, and if so, log an error message and return an empty array for both the remaining deck and the cards drawn
  if (deckToDrawFromArray.length === 0) {
    console.error("deck has no cards");
    return { remainingDeck: deckToDrawFromArray, cardsDrawn: [] };
  }
  // Check if the number of cards to draw is bigger than the number of cards in the deck, and if so, log an error message and return an empty array for both the remaining deck and the cards drawn
  if (deckToDrawFromArray.length < numberOfCardsToDraw) {
    console.error(
      "number of cards to draw cannot be bigger than the number of cards in the deck"
    );
    return { remainingDeck: deckToDrawFromArray, cardsDrawn: [] };
  }

  // Create a variable for the remaining deck
  const remainingDeck = deckToDrawFromArray;
  // Create a new variable for the cards that were drawn from the top of the deck
  const cardsDrawn = remainingDeck.splice(0, numberOfCardsToDraw);

  // Return an object with the remaining deck and the cards drawn
  return { remainingDeck, cardsDrawn };
};

/**
 * Adds cards to the top of a deck
 * @param {array<Card>} deckToAddTo - The deck to add cards to
 * @param {array<Card>} cardsToAdd - The cards to add to the deck
 * @returns {array<Card>} The modified deck
 */
const addToTopOfDeck = (deckToAddTo, cardsToAdd) => {
  if (cardsToAdd.length === 0) {
    console.error("cardsToAdd has no cards");
    return deckToAddTo;
  }
  return cardsToAdd.concat(deckToAddTo);
};

/**
 * Description
 * @param {Object[]} deckToSearchByName
 * @param {Array.<string>} namesToSearch
 * @returns {Array}
 */
const getFromDeckByNames = (deckToSearchByName, namesToSearch) => {
  const cardsFoundByName = namesToSearch.reduce((prev, name) => {
    const found = deckToSearchByName.filter((card) => card.name === name);
    return [...prev, ...found];
  }, []);
  return cardsFoundByName;
};

/**
 * @class Card
 *
 * Represents a card in a game
 *
 * @property {string} name - The name of the card.
 * @property {string} description - The description of the card.
 * @property {Object.<string, number>} effect - The effect of the card as an object literal.
 * @property {(state)=>any} playCard - The function that plays the card.
 */
class Card {
  name;
  description;
  effect = {};
  playCard = () => {};
  /**
   * @description
   * Card constructor

   * @param  {Object} cardLiteral object literal with props
   * @param {string} cardLiteral.name - name of card
   * @param {string} cardLiteral.description - human readable description of card
   * @param {Object.<string, number>} cardLiteral.effect - object which returns card effects
   * @param {(state)=>any} cardLiteral.playCard - function which plays the card
   * @returns {Card}
   */
  constructor({ name, description, effect, playCard }) {
    this.name = name;
    this.description = description;
    this.effect = effect;
    this.playCard = playCard;
  }
}

module.exports = {
  getDeckEffects,
  deckEffectsToString,
  drawFromTopOfDeck,
  addToTopOfDeck,
  shuffleDeck,
  getFromDeckByNames,
  getPlayedDeckEffects,
  Card,
};
