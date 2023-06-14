const {
  deckEffectsToString,
  drawFromTopOfDeck,
  shuffleDeck,
  DuplicateCard,
  Card,
} = require("../index");

//this is a deck that shouldn't change, think of it as a blueprint for all cards and then when we start a game we make a copy of it
const eventDeck = [
  new Card({
    name: "Herd spotted",
    description: "Forage order will yield higher gains for this turn",
    effect: { forageModifier: 10, morale: 4, turnLength: 1 },
  }),
  new Card({
    name: "Blazing heat",
    description:
      "attacks are 100% more costly. Forage yields lower gains. Active until another weather event card is drawn.",
    effect: { attackCostModifier: 2, morale: -1 },
  }),
  new Card({
    name: "Intervention",
    description: "A great power intervenes on your side",
    effect: { manPower: 10000 },
  }),
  new Card({
    name: "Blockade",
    description:
      "A Bloackade stops all resources from entering the conflict. Only famine is with us now",
    effect: { attritionModifier: 10 },
  }),
  new Card({
    name: "Pillar Of Fire",
    description: "A Pilar of fire destroys friend and foe alike",
    effect: { manPower: -10000, attackStrength: 1 },
  }),
  ...DuplicateCard(
    new Card({
      name: "Fell Words",
      description: "Fell words carry in from the west",
      effect: { fellWords: 1 },
    }),
    2
  ),
  ...DuplicateCard(
    new Card({
      name: "Nothing notable...",
      description: "No notable event has happened",
    }),
    10
  ),
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
  2
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
