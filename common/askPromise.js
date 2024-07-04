const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

module.exports = {
  ask,
};
