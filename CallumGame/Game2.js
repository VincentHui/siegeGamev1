const readlineSync = require('readline-sync');

const yellowText = "\x1b[33m";
const redText = "\x1b[31m";
const greenText = "\x1b[32m";
const blueText = "\x1b[34m";
const magentaText = "\x1b[35m";
const cyanText = "\x1b[36m";
const underlineText = "\x1b[4m";
const boldText = "\x1b[1m";
const resetText = "\x1b[0m";

class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.shield = false;
        this.doubleAttack = false;
        this.counterAttack = false;
    }

    displayStats() {
        console.log(`${boldText}${underlineText}${yellowText}${this.name}'s Stats:${resetText}`);
        console.log(`${yellowText}Health: ${this.health}${resetText}`);
        if (this.shield) console.log(`${greenText}Shield: Active${resetText}`);
        if (this.doubleAttack) console.log(`${greenText}Double Attack: Active${resetText}`);
        if (this.counterAttack) console.log(`${greenText}Counter Attack: Active${resetText}`);
    }

    // resetTemporaryEffects() {
    //     this.doubleAttack = false;
    // }
}

const gameState = {
    players: [
        new Player('Player 1'),
        new Player('Player 2')
    ],
    currentPlayerIndex: 0,
    turn: 1,
};

const eventCards = [
    {
        text: "Attack: Deal 10 damage to your opponent.",
        effect: (player, opponent) => {
            let damage = 10;
            if (player.doubleAttack) {
                damage *= 2;
                player.doubleAttack = false; // Use the double attack
            }
            if (opponent.shield) {
                console.log(`${blueText}${opponent.name} blocked the attack with a shield!${resetText}`);
                opponent.shield = false;
            } else {
                if (opponent.counterAttack) {
                    console.log(`${blueText}${opponent.name} reflected part of the attack!${resetText}`);
                    player.health -= damage / 2;
                    opponent.counterAttack = false;
                }
                opponent.health -= damage;
                console.log(`${blueText}${player.name} dealt ${damage} damage to ${opponent.name}.${resetText}`);
            }
        }
    },
    {
        text: "Heal: Restore 15 health.",
        effect: (player, opponent) => {
            player.health += 15;
            console.log(`${greenText}${player.name} healed 15 health.${resetText}`);
        }
    },
    {
        text: "Shield: Block the next attack.",
        effect: (player, opponent) => {
            player.shield = true;
            console.log(`${blueText}${player.name} is protected by a shield.${resetText}`);
        }
    },
    {
        text: "Double Attack: Double the damage of your next attack.",
        effect: (player, opponent) => {
            player.doubleAttack = true;
            console.log(`${blueText}${player.name} will deal double damage on their next attack.${resetText}`);
        }
    },
    {
        text: "Steal Health: Transfer 10 health from your opponent to yourself.",
        effect: (player, opponent) => {
            const healthSteal = Math.min(10, opponent.health);
            opponent.health -= healthSteal;
            player.health += healthSteal;
            console.log(`${blueText}${player.name} stole ${healthSteal} health from ${opponent.name}.${resetText}`);
        }
    },
    {
        text: "Counter Attack: Reflect half of the next damage received back to your opponent.",
        effect: (player, opponent) => {
            player.counterAttack = true;
            console.log(`${blueText}${player.name} will reflect part of the next attack.${resetText}`);
        }
    }
];

function chooseEventCard(player, opponent) {
    console.log(`${blueText}${underlineText}${boldText}Choose an Event Card:${resetText}`);
    eventCards.forEach((card, index) => {
        console.log(`${blueText}${index + 1}: ${card.text}${resetText}`);
    });

    let choice;
    do {
        choice = readlineSync.questionInt(`${cyanText}Enter the number of the card you want to play: ${resetText}`);
    } while (choice < 1 || choice > eventCards.length);

    const card = eventCards[choice - 1];
    console.log(`${blueText}${underlineText}You chose: ${card.text}${resetText}`);
    card.effect(player, opponent);
}

function nextTurn() {
    const player = gameState.players[gameState.currentPlayerIndex];
    const opponent = gameState.players[(gameState.currentPlayerIndex + 1) % gameState.players.length];
    console.log(`${magentaText}\n==============================${resetText}`);
    console.log(`${magentaText}Turn ${gameState.turn}: ${player.name}${resetText}`);
    player.displayStats();
    opponent.displayStats();

    chooseEventCard(player, opponent);

    // player.resetTemporaryEffects();
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    gameState.turn += 1;

    if (gameState.turn > 10 || player.health <= 0 || opponent.health <= 0) {
        console.log(`${redText}==============================${resetText}`);
        console.log(`${redText}${underlineText}Game Over!${resetText}`);
        const [player1, player2] = gameState.players;
        if (player1.health > player2.health) {
            console.log(`${greenText}Player 1 Wins!${resetText}`);
        } else if (player2.health > player1.health) {
            console.log(`${greenText}Player 2 Wins!${resetText}`);
        } else {
            console.log(`${blueText}It's a Draw!${resetText}`);
        }
        console.log(`${redText}==============================${resetText}`);
        process.exit(); // Terminate the Node.js process
    }
    console.log(`${magentaText}==============================${resetText}`);
}

while (true) {
    const player = gameState.players[gameState.currentPlayerIndex];
    readlineSync.question(`${boldText}Press Enter to take your turn, ${player.name}...${resetText}`);
    nextTurn();
}