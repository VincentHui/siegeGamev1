const { pubsub } = require("../common/pubSub.js");

pubsub.subscribe("start", () => {
  console.log("the game has begun!");
});

pubsub.subscribe("max turn reached", () => {
  console.log("We have reached the maxium turn limit...");
});
