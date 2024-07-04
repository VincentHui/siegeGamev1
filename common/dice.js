function diceRoll(diceAmount, diceSides) {
  let results = [];
  for (let i = 0; i < diceAmount; i++) {
    let roll = Math.floor(Math.random() * diceSides) + 1;
    results.push(roll);
  }
  return results;
}

module.exports = {
  diceRoll,
};
