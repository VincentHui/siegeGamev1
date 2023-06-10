const getShuffledNumberArray = (amount, start = 0) => {
  var foo = [];

  for (var i = start; i < amount; i++) {
    foo.push(i);
  }
  return shuffleArray(foo);
};

/**
 * @function shuffleArray
 * @description Shuffles an array of values
 * @param {array} unshuffled - Unshuffled array of values
 * @returns {array} shuffled - Shuffled array of values
 */
const shuffleArray = (unshuffled) => {
  // Map the values to objects with a random sort value
  let shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    // Sort the objects by the random sort value
    .sort((a, b) => a.sort - b.sort)
    // Map the sorted objects back to their values
    .map(({ value }) => value);
  return shuffled;
};

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const randomRangeInteger = (min, max) => Math.floor(randomRange(min, max));

module.exports = {
  getShuffledNumberArray,
  shuffleArray,
  randomRange,
  randomRangeInteger,
};
