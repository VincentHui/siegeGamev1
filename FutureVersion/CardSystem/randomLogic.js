/**
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

/**
 * Generates a random number between a given min and max value.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} A random number between the min and max values.
 */
const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * Returns a random integer between min (inclusive) and max (exclusive)
 * @param {Number} min - The minimum number
 * @param {Number} max - The maximum number
 * @returns {Number} A random integer between min (inclusive) and max (exclusive)
 */
const randomRangeInteger = (min, max) => Math.floor(randomRange(min, max));

module.exports = {
  shuffleArray,
  randomRange,
  randomRangeInteger,
};
