const getShuffledNumberArray = (amount, start = 0) => {
  var foo = [];

  for (var i = start; i < amount; i++) {
    foo.push(i);
  }
  return shuffleArray(foo);
};

const shuffleArray = (unshuffled) => {
  let shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
};

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

module.exports = {
  getShuffledNumberArray,
  shuffleArray,
  randomRange,
};
