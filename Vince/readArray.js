const readline = require("readline");

function navigateArray(elements, onNavigate) {
  return new Promise((resolve, reject) => {
    let currentIndex = 0;

    // Keypress event handler
    function handleKeypress(str, key) {
      const prevIndex = currentIndex;
      if (key.name === "left") {
        // Navigate left
        if (currentIndex > 0) {
          currentIndex--;
          onNavigate(currentIndex, elements, prevIndex);
        }
        return;
      }
      if (key.name === "right") {
        // Navigate right
        if (currentIndex < elements.length - 1) {
          currentIndex++;
          onNavigate(currentIndex, elements, prevIndex);
        }
        return;
      }
      if (key.name === "return") {
        // Log "hello" on Enter key press
        cleanup();
        resolve(elements[currentIndex]);
      }
      if (key.ctrl && key.name === "c") {
        // Exit on Ctrl+C
        cleanup();
        process.exit();
      }
    }

    // Cleanup function to reset process.stdin
    function cleanup() {
      process.stdin.removeListener("keypress", handleKeypress);
      process.stdin.removeListener("end", endHandler);
      process.stdin.setRawMode(false);
      //   process.stdin.pause();
    }

    function endHandler() {
      //   console.log("Exiting...");
      cleanup();
      //   reject("Stream ended, promise rejected");
    }

    // Set up readline to listen to key presses
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("keypress", handleKeypress);
    process.stdin.on("end", endHandler);
  });
}

module.exports = {
  navigateArray,
};
