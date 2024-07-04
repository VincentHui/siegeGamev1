const { pubsub } = require("../common/pubSub.js");

pubsub.subscribe("start", () => {
  console.log("the game has begun!");
});
