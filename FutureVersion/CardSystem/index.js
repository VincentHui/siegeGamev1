const { shuffleArray } = require("./randomLogic");
/**
 * This function will take in an array of objects and merge them into one object
 * @param {Object[]} data - An array of objects to be merged
 * @returns {Object} The merged result.
 */
const mergeObjects = (data) => {
  // Initialize a new object to store the merged result
  const result = {};

  // Iterate through each object in the data array
  data.forEach((basket) => {
    // Destructure each key-value pair from the current object
    for (let [key, value] of Object.entries(basket)) {
      // If the key already exists in the result object, add the current value to the existing one
      if (result[key]) {
        result[key] += value;
      } else {
        // Otherwise, set the key-value pair in the result object
        result[key] = value;
      }
    }
  });
  // Return the merged result
  return result;
};
/**
 * Function to get the names of cards in a deck.
 *
 * @param {Card[]} deck - The array of card objects.
 *
 * @returns {string[]} - An array of strings containing the names of each card in the deck.
 */
const getNamesOfCardsInDeck = (deck) => deck.map((card) => card.name);

/**
 * This function takes in a deck of cards as an argument and returns the merged effects from each card.
 * @function getDeckEffects
 * @param {Card[]} aDeck - The deck of cards.
 * @returns {Object} The effects of all the cards in the deck.
 */

const getDeckEffects = (aDeck) => {
  // Use the mergeObjects function to merge all the effects of the cards into one object
  const meregedEffects = mergeObjects(
    // Map over the deck and spread the effect property of each card into a new object
    aDeck.map((card) => ({ ...card.effect }))
  );
  // Return the merged effects object
  return meregedEffects;
};

/**
 * This function takes in a deck and a state, and returns the merged effects of playing all the cards in the deck
 * @function getPlayedDeckEffects
 * @param {Card[]} aDeck - The deck to be played.
 * @param {object} state - The current state of the game.
 * @returns {object} mergedEffects - The merged effects of playing the deck.
 */
const getPlayedDeckEffects = (aDeck, state) => {
  const meregedEffects = mergeObjects(
    aDeck.map((card) => ({ ...card.playCard(state) })) // map each card in the deck to its effect when played
  );
  return meregedEffects; // return the merged effects of all the cards in the deck
};

/**
 * GetCardFromDeckByName returns the card with the given name from the deck.
 * @param {string} cardName The name of the card to be returned.
 * @param {Card[]} deck An array of card objects.
 * @returns {Card} The card from the deck with the given name.
 */
function GetCardFromDeckByName(cardName, deck) {
  return deck.filter((card) => card.name === cardName)[0];
}

/**
 * @param {Card[]} aDeck
 * @returns {String} result
 */
const deckEffectsToString = (aDeck) => {
  const effect = getDeckEffects(aDeck);
  let result = "";
  for (const [key, value] of Object.entries(effect)) {
    result += `${key}:${value} `;
  }
  return result;
};

/**
 * Shuffle a deck of cards
 * @param {Card[]} deckToShuffle - The deck to be shuffled
 * @returns {Card[]} The shuffled deck
 */
const shuffleDeck = (deckToShuffle) => shuffleArray(deckToShuffle);

/**
 * This function takes in an array of cards (deckToDrawFromArray) and a number of cards to draw (numberOfCardsToDraw).
 * It then returns an object containing the remaining deck and the cards that were drawn from the top.
 * We return these new values and let the caller decide how to change whats give not the function
 * @param {Card[]} deckToDrawFromArray An array of cards from which to draw.
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
 * This function draws one card from the top of a given deck
 * @param {Card[]} deckToDrawFrom - The deck to draw from
 * @returns {Card} The card drawn from the top of the deck
 */
const drawOneCardFromTopOfDeck = (deckToDrawFrom) => {
  // Draws from the top of the given deck and returns an object with cardsDrawn property
  const { cardsDrawn } = drawFromTopOfDeck(deckToDrawFrom, 1);
  // Returns the first card drawn from the deck
  return cardsDrawn[0];
};

/**
 *  adds an array of cards to the top of a deck
 * @param {Card[]} deckToAddTo - The deck to add cards to
 * @param {Card[]} cardsToAdd - The cards to add to the deck
 * @returns {Card[]} The modified deck
 */
const addToTopOfDeck = (deckToAddTo, cardsToAdd) => {
  // If there are no cards to add, log an error and return the original deck
  if (cardsToAdd.length === 0) {
    console.error("cardsToAdd has no cards");
    return deckToAddTo;
  }
  // Return the new deck with the cards added to the top
  return cardsToAdd.concat(deckToAddTo);
};

/**
 *  This function takes in a deck to search by name and an array of names to search for.
 * It then filters through the deck to find cards with the specified names and returns them in an array.
 * @param {Card[]} deckToSearchByName
 * @param {string[]} namesToSearch
 * @returns {Card[]}
 */

const getFromDeckByNames = (deckToSearchByName, namesToSearch) => {
  const cardsFoundByName = namesToSearch.reduce((prev, name) => {
    // reduce the namesToSearch array into one value
    const found = deckToSearchByName.filter((card) => card.name === name); // filter through the deck to find cards with the specified names
    return [...prev, ...found]; // return the found cards in an array
  }, []); // start with an empty array
  return cardsFoundByName; // return the array of found cards
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

/**
 * This function takes in a card to duplicate and an amount of cards to duplicate it by
 * and returns an array of duplicated cards.
 * @function DuplicateCard
 * @param {Card} cardToDuplicate - The object to be duplicated
 * @param {Number} amountOfCards - The number of duplicates to create
 * @returns {Card[]} An array of the duplicated objects
 */
const DuplicateCard = (cardToDuplicate, amountOfCards) => {
  // Set the amount to at least 0
  const amount = Math.max(amountOfCards, 0);
  let duplicatedCards = [];
  // Loop through the amount of cards specified
  for (let index = 0; index < amount; index++) {
    // Push the card to be duplicated into the array
    duplicatedCards.push(cardToDuplicate);
  }
  // Return the array of duplicated cards
  return duplicatedCards;
};

module.exports = {
  getDeckEffects,
  deckEffectsToString,
  drawFromTopOfDeck,
  addToTopOfDeck,
  shuffleDeck,
  getFromDeckByNames,
  getPlayedDeckEffects,
  getNamesOfCardsInDeck,
  Card,
  DuplicateCard,
  GetCardFromDeckByName,
  drawOneCardFromTopOfDeck,
};
