/**
 * @function shuffleArray
 * @description Shuffles an array of values
 * @param {Card[]} unshuffled - Unshuffled array of values
 * @returns {Card[]} shuffled - Shuffled array of values
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
  shuffleArray,
  randomRange,
  randomRangeInteger,
};
