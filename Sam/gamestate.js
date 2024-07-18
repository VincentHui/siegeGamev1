let GameState = {
  Manpower: 7500,
  Morale: 20,
};

function Roll() {
  let diceRoll1 = Math.floor(Math.random() * 6 + 1);
  let diceRoll2 = Math.floor(Math.random() * 6 + 1);
  return diceRoll1 + diceRoll2;
}

module.exports = { GameState, Roll };
