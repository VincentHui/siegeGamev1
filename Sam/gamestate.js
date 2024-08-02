let GameState = {
  attacker: {
    Manpower: 10000,
    Morale: 20,
    Reserves: 0,
  },
  defender: {
    Manpower: 5000,
    Morale: 15,
  },
};

function Roll() {
  let diceRoll1 = Math.floor(Math.random() * 6 + 1);
  let diceRoll2 = Math.floor(Math.random() * 6 + 1);
  return diceRoll1 + diceRoll2;
}

module.exports = { GameState, Roll };
