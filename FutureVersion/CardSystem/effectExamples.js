const {
  deckEffectsToString,
  drawFromTopOfDeck,
  shuffleDeck,
} = require("./index");

//this is a deck that shouldn't change, think of it as a blueprint for all cards and then when we start a game we make a copy of it
const eventDeck = [
  {
    name: "Herd spotted",
    description: "Forage order will yield higher gains for this turn",
    effect: (state) => ({ forageModifier: 10, morale: 4, turnLength: 1 }),
  },
  {
    name: "Blazing heat",
    description:
      "attacks are 100% more costly. Forage yields lower gains. Active until another weather event card is drawn.",
    effect: (state) => ({ attackCostModifier: 2, morale: -1 }),
  },
  {
    name: "Intervention",
    description: "A great power intervenes on your side",
    effect: (state) => ({ manPower: 10000 }),
  },
  {
    name: "Blockade",
    description:
      "A Bloackade stops all resources from entering the conflict. Only famine is with us now",
    effect: (state) => ({ attritionModifier: 10 }),
  },
  {
    name: "Pillar Of Fire",
    description: "A Pilar of fire destroys friend and foe alike",
    effect: (state) => ({ manPower: -10000, attackStrength: 1 }),
  },
];

//setup the games initial deck
const currentGameDecks = {
  eventDeck: shuffleDeck(eventDeck),
};
//setup the players deck
const playerDecks = {
  eventDeck: [],
};

//get current effects which should be none
console.log(`current effects ${deckEffectsToString(playerDecks.eventDeck)}`);

//draw from deck
const { remainingDeck, cardsDrawn } = drawFromTopOfDeck(
  currentGameDecks.eventDeck,
  1
);
//update the games deck
currentGameDecks.eventDeck = remainingDeck;
//update the players deck
playerDecks.eventDeck = cardsDrawn;

// console.log(playerDecks);
// console.log(currentGameDecks);

//get current effects which should be something now that we've drawn from the deck
console.log(`current effects ${deckEffectsToString(playerDecks.eventDeck)}`);

//get players effect deck which should have one card in it
console.log(playerDecks.eventDeck);
