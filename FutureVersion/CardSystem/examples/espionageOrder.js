const { Card, deckEffectsToString, getDeckEffects, getPlayedDeckEffects, drawFromTopOfDeck, shuffleDeck} = require("../index");


const shuffleDrawPlay = (deck, state) => {
    const shuffledDeck = shuffleDeck(deck);
    const drawncard = drawFromTopOfDeck(shuffledDeck, 1);
    const playCardEffect = getPlayedDeckEffects(drawncard);

    // const playerDecks = {shuffledDeck: []}
    // const deckEffect = deckEffectsToString(playerDecks.shuffledDeck)
    // const playDrawnCard = 
    // const cardEffects = drawnCard.playCard(state);
    // const deckEffectsString = deckEffectsToString(deck);
  
    return {playCardEffect};
    
  };

 module.exports = {
  shuffleDrawPlay
 }