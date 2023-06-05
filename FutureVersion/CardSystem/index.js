const { getShuffledNumberArray, shuffleArray } = require("./randomLogic");

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
    aDeck.map((card) => ({ ...card.effect() }))
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

const drawFromTopOfDeck = (deckToDrawFromArray, numberOfCardsToDraw) => {
  if (deckToDrawFromArray.length === 0) {
    console.error("deck has no cards");
    return { remainingDeck: deckToDrawFromArray, cardsDrawn: [] };
  }
  if (deckToDrawFromArray.length < numberOfCardsToDraw) {
    console.error(
      "number of cards to draw cannot be bigger than the number of cards in the deck"
    );
    return { remainingDeck: deckToDrawFromArray, cardsDrawn: [] };
  }

  const remainingDeck = deckToDrawFromArray;
  const cardsDrawn = remainingDeck.splice(0, numberOfCardsToDraw);

  return { remainingDeck, cardsDrawn };
};

const addToTopOfDeck = () => {};

const getFromDeckByNames = (deckToSearchByName, namesToSearch) => {
  const cardsFoundByName = namesToSearch.reduce((prev, name) => {
    const found = deckToSearchByName.filter((card) => card.name === name);
    return [...prev, ...found];
  }, []);
  return cardsFoundByName;
};

module.exports = {
  getDeckEffects,
  deckEffectsToString,
  drawFromTopOfDeck,
  addToTopOfDeck,
  shuffleDeck,
  getFromDeckByNames,
};
