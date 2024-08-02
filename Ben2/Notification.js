const { pubsub } = require("../common/pubSub.js");

pubsub.subscribe("start", () => {
  console.log("the game has begun!");
});

pubsub.subscribe("max turn reached", () => {
  console.log("We have reached the maxium turn limit...");
});

pubsub.subscribe(
  `${Players.forEach((player) => {
    if (player.hexes.bloodhex > 0) {
    }
  })}`,
  console.log(`poo`)
);

pubsub.subscribe(`Bleeding +1 stack`, console.log(`poo`));
