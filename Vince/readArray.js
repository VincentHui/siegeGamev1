const readline = require("readline");

// Array to navigate
const elements = [
  { name: "Element first", cursor: "A" },
  { name: "Element X", cursor: "A" },
  { name: "Element Z", cursor: "A" },
  { name: "Element FREEDOM", cursor: "B" },
  { name: "Element poo", cursor: "B" },
];
let currentIndex = 0;

// Function to display the current element
function displayCurrentElement() {
  readline.moveCursor(process.stdout, 0, -1);
  readline.clearScreenDown(process.stdout);
  console.log(
    `${elements.map((el, i) => {
      return currentIndex === i ? `[${el.name}]` : `[]`;
    })}`
  );
}

// Initial display
displayCurrentElement();

// Set up readline to listen to key presses
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {
  if (key.name === "left") {
    // Navigate left
    if (currentIndex > 0) {
      currentIndex--;
      displayCurrentElement();
    }
  }
  if (key.name === "right") {
    // Navigate right
    if (currentIndex < elements.length - 1) {
      currentIndex++;
      displayCurrentElement();
    }
  }
  if (key.name === "return") {
    console.log(`selected ${elements[currentIndex]}`);

    process.exit();
  }
  if (key.ctrl && key.name === "c") {
    // Exit on Ctrl+C
    process.exit();
  }
});

process.stdin.on("end", () => {
  console.log("Exiting...");
});
