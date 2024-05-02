let diceAmount = 2;
let diceSides = 12;
let rolls = diceRoll(diceAmount, diceSides);

function diceRoll(diceAmount, diceSides) {
  let results = [];
  for (let i = 0; i < diceAmount; i++) {
    let roll = Math.floor(Math.random() * diceSides) + 1;
    results.push(roll);
  }
  return results;
}

console.log(
  `Rolling ${diceAmount} ${diceSides}-sided dice: ${rolls.join(", ")}`
);
