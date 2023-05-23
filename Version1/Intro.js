let manPower = 10000
let armyStatus = "fresh"
const yellowText = "\x1b[33m";
const resetText = "\x1b[0m";
// const playerOrdersLowercase = ["attack", "engineering", "espionage", "recover"];
// const lowercaseOrders = playerOrdersLowercase.map(order => order.toLowerCase());


const playerOrders = ["Attack", "Engineering", "Espionage", "Recover"]
const playerOrdersListed = playerOrders.join ("\n")
const engineeringArray = ["Camp", "Projects", "Weapons"]
const engineeringArrayListed = engineeringArray.join ("\n")


console.log("Welcome to the Game");


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('What is your name?', name => {
    console.log(`General ${name}! Your Army awaits your orders.`);

    // readline.question('What is your name?', name => {
    //     console.log(`General ${name}! Your Army awaits your orders.`);

    
    readline.question(`What are your orders? ${yellowText}\n${playerOrdersListed}${resetText}`, answer => {
        // const lowercaseAnswer = answer.toLowerCase();

        if (answer == playerOrders[0]){
             manPower = manPower- 2000
        console.log(`General, you ordered ${answer}. \n Manpower: ${manPower}`)};
       

        if (answer == playerOrders[1]){
            console.log(`General, you ordered ${answer}. What would you like to build? ${yellowText}\n${engineeringArrayListed}${resetText}`);
            readline.question (`Enter your choice`), answer => {
                if (answer == engineeringArray[0]){
                console.log(`General, you ordered ${answer}. \n Manpower: ${manPower}.`)};
           readline.close()
            }};
                

        if (answer == playerOrders[2]){
            console.log(`General, you ordered ${answer}.\n Manpower: ${manPower}`)};

        if (answer == playerOrders[3]){
            manPower = manPower + 500
            console.log(`General, you ordered ${answer}.\n Manpower: ${manPower}`)};


        readline.close();
  });
});





  
