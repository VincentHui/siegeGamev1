const readlineSync = require('readline-sync');




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
    console.log(`\n ** Event Card: ${card.text} ** \n`);
    card.effect(player, gameState);
}

function rollAndDraw(player, gameState, isEventCardTurn = false) {
    if (!isEventCardTurn) {
        const roll = rollDice();
        player.score += roll;
        console.log(`Player ${gameState.currentPlayer} rolled a ${roll}.`);
    }
    drawEventCard(player);
}

function nextTurn() {
    const currentPlayerKey = `player${gameState.currentPlayer}`;
    const currentPlayer = gameState[currentPlayerKey];

    rollAndDraw(currentPlayer, gameState);

    console.log(`Player 1 score: ${gameState.player1.score}`);
    console.log(`Player 2 score: ${gameState.player2.score}`);

    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    gameState.turn += 1;

    if (gameState.turn > 10) {
        console.log("Game Over!");
        if (gameState.player1.score > gameState.player2.score) {
            console.log("Player 1 Wins!");
        } else if (gameState.player2.score > gameState.player1.score) {
            console.log("Player 2 Wins!");
        } else {
            console.log("It's a Draw!");
        }
        process.exit();
    }
}

while (true) {
    console.log(`\nTurn ${gameState.turn}: Player ${gameState.currentPlayer}`);
    readlineSync.question('Press Enter to roll the die...\n\n\n');
    nextTurn();
}
