const Redis = require("ioredis");
// const { Subscribe } = require("./subscribe");

const SetupPublish = () => {
  // Create a Redis client for the publisher
  const publisher = new Redis(
    "rediss://default:AeLWAAIjcDFmZDZmYzQxN2QzYzA0MTA5OGQxY2VhMGJhN2I5OWEzMHAxMA@tops-louse-58070.upstash.io:6379"
  );

  // // Create a Redis client for the subscriber
  // const subscriber = new Redis(
  //   "rediss://default:AeLWAAIjcDFmZDZmYzQxN2QzYzA0MTA5OGQxY2VhMGJhN2I5OWEzMHAxMA@tops-louse-58070.upstash.io:6379"
  // );

  // Handle connection events for publisher
  publisher.on("connect", () => {
    console.log("Publisher connected to Redis");
  });

  publisher.on("error", (err) => {
    console.error("Publisher connection error", err);
  });

  return publisher;
};

// // Handle connection events for subscriber
// subscriber.on("connect", () => {
//   console.log("Subscriber connected to Redis");
// });

// subscriber.on("error", (err) => {
//   console.error("Subscriber connection error", err);
// });

// // Subscribe to a channel
// const channel = "my_channel";
// subscriber.subscribe(channel, (err, count) => {
//   if (err) {
//     console.error("Failed to subscribe: ", err.message);
//   } else {
//     console.log(
//       `Subscribed successfully! This client is currently subscribed to ${count} channels.`
//     );
//   }
// });

// // Handle incoming messages
// subscriber.on("message", (channel, message) => {
//   console.log(`Received message from ${channel}: ${message}`);
// });

// // Publish a message to the channel every 5 seconds
// setInterval(() => {
//   const message = `Message at ${new Date().toISOString()}`;
//   publisher.publish(channel, message, (err, reply) => {
//     if (err) {
//       console.error("Publish error", err);
//     } else {
//       console.log(`Published message: ${message}`);
//     }
//   });
// }, 5000);
module.exports = {
  SetupPublish,
};
