const readlineSync = require('readline-sync');

const yellowText = "\x1b[33m";
const redText = "\x1b[31m";
const greenText = "\x1b[32m";
const blueText = "\x1b[34m";
const magentaText = "\x1b[35m";
const cyanText = "\x1b[36m";
const resetText = "\x1b[0m";
const underlineText = "\x1b[4m";

let gameState = {
    player1: { score: 0 },
    player2: { score: 0 },
    currentPlayer: 1,
    turn: 1,
};

const eventCards = [
    { text: "Gain 2 points!", effect: (player) => player.score += 2 },
    { text: "Lose 1 point.", effect: (player) => player.score -= 1 },
    { text: "Roll again!", effect: (player, gameState) => rollAndDraw(player, gameState, true) },
    { text: "Gain 3 points!", effect: (player) => player.score += 3 },
    { text: "Lose 2 points.", effect: (player) => player.score -= 2 },
];

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function drawEventCard(player) {
    const card = eventCards[Math.floor(Math.random() * eventCards.length)];
    console.log(`${blueText}** Event Card: ${card.text} **${resetText} `);
    card.effect(player, gameState);
}

function rollAndDraw(player, gameState, isEventCardTurn = false) {
    if (!isEventCardTurn) {
        const roll = rollDice();
        player.score += roll;
        console.log(`${greenText}${underlineText}Player ${gameState.currentPlayer} rolled a ${roll}.${resetText}\n`);
    }
    drawEventCard(player);
}

function nextTurn() {
    const currentPlayerKey = `player${gameState.currentPlayer}`;
    const currentPlayer = gameState[currentPlayerKey];

    rollAndDraw(currentPlayer, gameState);

    console.log(`${yellowText}==============================${resetText}`);
    console.log(`${yellowText}Player 1 score: ${gameState.player1.score}${resetText}`);
    console.log(`${yellowText}Player 2 score: ${gameState.player2.score}${resetText}`);
    console.log(`${yellowText}==============================${resetText}`);

    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    gameState.turn += 1;

    if (gameState.turn > 10) {
        console.log(`${redText}==============================${resetText}`);
        console.log(`${redText}Game Over!${resetText}`);
        if (gameState.player1.score > gameState.player2.score) {
            console.log(`${greenText}Player 1 Wins!${resetText}`);
        } else if (gameState.player2.score > gameState.player1.score) {
            console.log(`${greenText}Player 2 Wins!${resetText}`);
        } else {
            console.log(`${blueText}It's a Draw!${resetText}`);
        }
        console.log(`${redText}==============================${resetText}`);
        process.exit(); // Terminate the Node.js process
    }
}

while (true) {
    console.log(`${magentaText}\nTurn ${gameState.turn}: Player ${gameState.currentPlayer}${resetText}`);
    readlineSync.question(`${cyanText}Press Enter to roll the die...${resetText}\n`);
    nextTurn();
}

