const readline = require("readline");

function startLoader(duration) {
  return new Promise((resolve) => {
    const frames = ["-", "\\", "|", "/"];
    let index = 0;

    const interval = setInterval(() => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(frames[index]);
      index = (index + 1) % frames.length;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      readline.cursorTo(process.stdout, 0);
      process.stdout.write("Done!\n");
      resolve();
    }, duration);
  });
}

module.exports = {
  startLoader,
};
