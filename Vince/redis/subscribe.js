const Redis = require("ioredis");
// Create a Redis client for the subscriber

const Subscribe = (channel) => {
  const subscriber = new Redis(
    "rediss://default:AeLWAAIjcDFmZDZmYzQxN2QzYzA0MTA5OGQxY2VhMGJhN2I5OWEzMHAxMA@tops-louse-58070.upstash.io:6379"
  );

  // Handle connection events for subscriber
  subscriber.on("connect", () => {
    console.log("Subscriber connected to Redis");
  });

  subscriber.on("error", (err) => {
    console.error("Subscriber connection error", err);
  });

  // Subscribe to a channel
  // const channel = "my_channel";
  subscriber.subscribe(channel, (err, count) => {
    if (err) {
      console.error("Failed to subscribe: ", err.message);
    } else {
      console.log(
        `Subscribed successfully! This client is currently subscribed to ${count} channels.`
      );
    }
  });

  // Handle incoming messages
  subscriber.on("message", (channel, message) => {
    console.log(`Received message from ${channel}: ${message}`);
    console.log();
    console.log();
  });
};

module.exports = {
  Subscribe,
};
