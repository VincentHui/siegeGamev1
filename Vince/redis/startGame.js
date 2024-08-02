const { SetupPublish } = require("./publish");
const { ask } = require("../../common/askPromise");
const { wait } = require("../../common/wait");
const { openTerminal } = require("./openTerminal");
const readline = require("readline");
const { navigateArray } = require("../readArray");

const channel = "my_channel";
const publisher = SetupPublish();

async function userArraySelect(array) {
  const result = await navigateArray(array, (index, elements) => {
    readline.moveCursor(process.stdout, 0, -2);
    readline.clearScreenDown(process.stdout);
    console.log(`${elements.map((el, i) => `[${i === index ? "*" : ""}]`)}`);
    console.log(elements[index]);
  });
  return result;
}

const playerCommands = [
  {
    name: "shoot",
  },
  {
    name: "reload",
  },
  {
    name: "defend",
  },
];

function generateRandomWord(length) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let word = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    word += alphabet[randomIndex];
  }
  return word;
}

const randomUser = generateRandomWord(5);

const GameLoop = async () => {
  await wait(1000);

  await ask("Enter input to start ");
  openTerminal("node SubscribeToGameEvents.js");
  let turn = 0;
  while (true) {
    const result = await userArraySelect(playerCommands);
    const message = { result, user: randomUser };
    publisher.publish(channel, JSON.stringify(message), (err, reply) => {
      if (err) {
        console.error("Publish error", err);
      } else {
        console.log(`Published message: ${JSON.stringify(message)}`);
      }
    });
  }
};
GameLoop();
