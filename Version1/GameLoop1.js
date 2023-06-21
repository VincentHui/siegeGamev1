let manPower = 15000;
let armyStatus = "fresh";
let turnDay = 1;
let event3Status = "ready";
let turn5Event = 0;
let posternGate = 0;
let event11Status = "on";
let event15Status = "closed";
let event17Status = 0;
let minesEvent = "off";
let pallisadesStatus = "off";
let siegeRampStatus = "off";
let siegeRampPower = 0;
let eventsiegerampStatus = "open";
let siegeRampYes = "off";
let siegeRampAttack = "off";
let eventsiegerampStatus1 = "open";
let campStatus = "off";
let espionageStatus = 1;
let cityDefenses = 3;
let cityWalls = "intact";
let siegeTowers = 0;
let siegeRams = 0;
let siegeBallista = 0;
let siegeOnager = 0;
let attackModifiers = 0;
let minesStatus = "off";
let playerChoiceABC0 = "off";
let playerChoiceABC1 = "off";
let playerChoiceABC2 = "off";
let playerChoiceABC3 = "off";
let randomDay = Math.floor(Math.random() * (14 - 7 + 1)) + 6;
// do {
//   randomDay = Math.floor(Math.random() * (14 - 7 + 1)) + 6;
// } while (randomDay === 11 && randomDay === 8);
let triggerDay = randomDay;
let randomDay3 = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
let triggerDay3 = randomDay3;
let randomDay5 = Math.floor(Math.random() * (7 - 5 + 1)) + 5;
let triggerDay5 = randomDay5;
let randomDaySiegeRamp = Math.floor(Math.random() * (15 - 12 + 1)) + 12;
let triggerDaySiegeRamp = randomDaySiegeRamp;
const yellowText = "\x1b[33m";
const redText = "\x1b[31m";
const greenText = "\x1b[32m";
const resetText = "\x1b[0m";
// const playerOrdersLowercase = ["attack", "engineering", "espionage", "recover"];
// const lowercaseOrders = playerOrdersLowercase.map(order => order.toLowerCase());
const playerChoice = ["Yes", "No"];
const playerChoiceListed = playerChoice.join("\n");
const playerChoiceABC = ["1", "2", "3", "4"];
const playerChoiceABCListed = playerChoiceABC.join("\n");
const playerOrders = ["Attack", "Engineering", "Espionage", "Recover"];
const playerOrdersListed = playerOrders.join("\n");
const engineeringArray = ["Camp", "Projects", "Weapons"];
const engineeringArrayListed = engineeringArray.join("\n");
const projectsArray = ["Mine", "Siege Ramp", "Palisades"];
const projectsArrayListed = projectsArray.join("\n");
const siegeWeaponsArray = ["Siege Tower", "Rams", "Ballistae", "Onager"];
const siegeWeaponsArrayListed = siegeWeaponsArray.join("\n");
const randomAmount = Math.floor(Math.random() * 4354) + 1132;
const randomAmountCamp = Math.floor(Math.random() * 2462) + 394;
const randomAmountSiegeRamp = Math.floor(Math.random() * 3247) + 136;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// function endTurn() {
//   readline.question(
//     "\n...as orders are carried out, the day draws to a close. \n Press Enter to continue:"
//   ),
//     (answer) => {
//       turnDay = turnDay + 1;
//       console.log(`\n Turn ${turnDay}`);
//       oneTurn();
//     };
// }

// function startGame() {
// readline.question("What is your name?"),
//   (name) => {
//     console.log(`General ${name}! Your Army awaits your orders.`);
//     readline.close;
//   };

console.log(
  "General! You are needed at the front! The High King has decreed for the citadel to be taken at all costs. \n Engineering order for various constructions. Espionage order increases your espionage level by 1. \n The higher the level, the more intel you will recieve. \n Attack at the moment of your choosing.  Remember: Slow is smooth, smooth is fast.  Good luck General."
);
console.log(`\n${greenText}Day ${turnDay}${resetText}`);
// startGame();

function oneTurn() {
  //EVENTS
  if (turnDay == triggerDay5 && turn5Event == 0) {
    if (campStatus == "on") {
      turn5Event = 1;
      manPower -= randomAmountCamp;
      attackModifiers -= 1;
      console.log(
        `${yellowText}{EVENT}\nThe enemy defenders have sallied out of the city and have hampered siege efforts! The camp we constructed has proven very useful in detering the defenders.${resetText} \nManpower: ${redText}${manPower}${resetText}\n...`
      );
    } else if (campStatus == "off") {
      turn5Event = 1;
      manPower -= randomAmount;
      attackModifiers -= 3;
      console.log(
        `${yellowText}{EVENT}\nThe enemy defenders have sallied out of the city and have significantly hampered siege efforts! Without a camp for our army, we have taken heavy losses!${resetText} \nManpower: ${redText}${manPower}${resetText}\n...`
      );
    }
    readline.question("", () => {
      oneTurn();
    });
  }

  if (turnDay === 9 && armyStatus == "tired") {
    armyStatus = "fresh";

    oneTurn();
  }

  if (turnDay === 8 && armyStatus == "fresh") {
    armyStatus = "tired";
    console.log(
      `${yellowText}{EVENT}\nThe scorching heat has brought our army to a standstill. It would be wise for us to take this day to rest. ${resetText}\n...`
    );

    readline.question("", () => {
      oneTurn();
    });
  }

  if (turnDay === 12 && armyStatus == "tired") {
    armyStatus = "fresh";

    oneTurn();
  }

  if (turnDay == 11 && event11Status == "on") {
    if (pallisadesStatus == "on") {
      event11Status = "off";
      manPower = manPower - 52;
      console.log(
        `${yellowText}{EVENT}\nUnder the cover of the night, local indigenous tribes in the region launched a suprise raid into our camp! However, with our extensive camp fortifications, we only sustained very minimal casualties. They will pay for this! ${resetText}\nManpower:${redText}${manPower}${resetText}\n...`
      );
    } else if (pallisadesStatus == "off") {
      event11Status = "off";
      armyStatus = "tired";
      manPower -= randomAmountCamp;
      console.log(
        `${yellowText}{EVENT}\nUnder the cover of the night, local indigenous tribes in the region launched a suprise raid into our camp! Vile wurms! They must have been bribed! Our men need rest today! ${resetText}\nManpower:${redText}${manPower}${resetText}\n...`
      );
    }
    readline.question("", () => {
      oneTurn();
    });
  }
  if (turnDay == triggerDay3 && event3Status == "ready") {
    event3Status = "done";
    manPower = manPower + 500;
    console.log(
      `${yellowText}{EVENT}\nA detachment of lagging and lost men have finally caught up to our army! 500 able-bodied men are at your command.${resetText}\nManpower:${greenText}${manPower}${resetText}\n...`
    );
    readline.question("", () => {
      oneTurn();
    });
  }

  if (
    turnDay == triggerDaySiegeRamp &&
    siegeRampStatus == "on" &&
    eventsiegerampStatus == "open"
  ) {
    eventsiegerampStatus = "closed";
    siegeRampPower = siegeRampPower + 1;
    readline.question(
      `${yellowText}{EVENT}\nGeneral, construction of our siege ramp has been steadily progressing under the watchful eye of Vizier Khilbron. The Vizier requests an additional delegation of 1000 men for the construction effort.${resetText}\n\n...\nShould we delegate more men to the effort?\n${yellowText}${playerChoiceListed}${resetText}\n`,
      (answer) => {
        if (answer == playerChoice[0]) {
          manPower = manPower - 1000;
          siegeRampPower = siegeRampPower + 1;
          attackModifiers = attackModifiers + 1;
          siegeRampYes = "on";
          console.log(
            `\n${yellowText}"1000 more men will be delegated toward the project. With haste!"${resetText}\nManpower:${redText}${manPower}${resetText}\n...`
          );
          readline.question("", () => {
            oneTurn();
          });
        } else siegeRampYes = "no";
        console.log(
          `\n${yellowText}"We must make do with the men we have."${resetText}\n...`
        );
        readline.question("", () => {
          oneTurn();
        });
      }
    );
  }

  if (
    turnDay === 17 &&
    siegeRampStatus == "on" &&
    eventsiegerampStatus1 == "open" &&
    siegeRampYes == "on"
  ) {
    siegeRampAttack = "on";
    eventsiegerampStatus1 = "closed";
    siegeRampPower = siegeRampPower + 1;
    attackModifiers = attackModifiers + 1;
    console.log(
      `${yellowText}{EVENT}\nGeneral, as our siege ramp nears completion, the defenders are throwing everything they have to hamper the progress. It is clear that the psychological impact of our siege ramp have greatly demoralized the defenders. **From this turn forward, attacks are enhanced and losses are reduced.**${resetText}\n\n...`
    );
    readline.question("", () => {
      oneTurn();
    });
  }
  if (turnDay === 20 && siegeRampYes == "no") {
    siegeRampYes = "done";
    siegeRampAttack = "on";
    siegeRampPower = siegeRampPower + 1;
    attackModifiers = attackModifiers + 1;
    console.log(
      `${yellowText}{EVENT}\nGeneral, as our siege ramp nears completion, the defenders are throwing everything they have to hamper the progress. It is clear that the psychological impact of our siege ramp have greatly demoralized the defenders. **From this turn forward, attacks are enhanced and losses are reduced.**${resetText}\n\n...`
    );
    readline.question("", () => {
      oneTurn();
    });
  }
  if (turnDay === 16 && event15Status == "open") {
    event15Status = "closed";
    posternGate = 1;
    readline.question("", () => {
      oneTurn();
    });
  }

  if (turnDay === 17 && posternGate == 1) {
    posternGate = 0;
    readline.question("", () => {
      oneTurn();
    });
  }
  if (turnDay === 15 && espionageStatus >= 5) {
    espionageStatus = espionageStatus - 15;
    event15Status = "open";
    console.log(
      `${yellowText}{EVENT}\nGeneral, our spy has found a friendly sympathizer willing to work with us. In exchange for a lumpsome of gold and safe passage for his family, the door will be left opened tomorrow, allowing our army access into the city. It would be the perfect time to attack... ${resetText}\n...`
    );
    readline.question("", () => {
      oneTurn();
    });
  }
  if (turnDay === 18 && event17Status == 0) {
    event17Status = 122;
    console.log(
      `${yellowText}{EVENT} \nGeneral, our spy reports an Enemy messenger has reached the city, informing of a relief force arriving in the next few days! We must hurry!
        ${resetText}\n...`
    );
    readline.question("", () => {
      oneTurn();
    });
  }
  if (turnDay === 21) {
    console.log(`${yellowText}{EVENT} \nGeneral, enemy reinforcements have arrived! We were too slow to capture the city. We must fall back! This has been a serious defeat. You will face the high king's wrath and be skinned alive. \n\n
  DEFEAT${resetText}`);
  }

  if (turnDay == 10 && minesStatus == "on" && minesEvent == "off") {
    minesEvent = "done";
    readline.question(
      `${yellowText}{EVENT}\nGeneral, progress on the mine has been slow, but steady. As we continue to dig closer to the ramparts, sapping operations have since transitioned to a cautious crawl, as defenders may begin to pick up on our project and start conducting sabotaging operations.${resetText}
${yellowText}${playerChoiceABC[0]})${resetText} "Quicken our tunneling operations at the risk of enemy detection!" 
${yellowText}${playerChoiceABC[1]})${resetText} "I do not care! Put every man to work! The ramparts must crumble by tomorrow morning!"
${yellowText}${playerChoiceABC[2]})${resetText} "This project is too costly for our army to sustain and risk- cancel the operation and recall our men! They are needed elsewhere!"
${yellowText}${playerChoiceABC[3]})${resetText} "Tell the sappers to slow down the pace if need be. We must not let the defenders know of our operation."
... `,

      (answer) => {
        if (answer == playerChoiceABC[0]) {
          playerChoiceABC0 = "on";
          console.log(
            `\n${yellowText}"Quicken our tunneling operations at the risk of enemy detection!" ${resetText}\n...`
          );
        } else if (answer == playerChoiceABC[1]) {
          playerChoiceABC1 = "on";

          console.log(
            `\n${yellowText}"I do not care! Put every man to work! The ramparts must crumble by tomorrow morning!"${resetText}\n\n${redText} -936 Manpower ${resetText}\n...`
          );
          manPower = manPower - 936;
          console.log(`\nManpower:${redText}${manPower}${resetText}`);
        } else if (answer == playerChoiceABC[2]) {
          playerChoiceABC2 = "on";

          console.log(
            `\n${yellowText}"This project is too costly for our army to sustain and risk- cancel the operation and recall our men! They are needed elsewhere!"${resetText}\n\n${greenText} +2000 Manpower ${resetText}\n...`
          );
          manPower = manPower + 2000;
          console.log(`\nManpower:${greenText}${manPower}${resetText}`);
        } else {
          playerChoiceABC3 = "on";
          console.log(
            `\n${yellowText}"Tell the sappers to slow down the pace if need be. We must not let the defenders know of our operation."\n...${resetText}`
          );
        }
        readline.question("", () => {
          oneTurn();
        });
      }
    );
  }

  // if (turn == 12 && playerChoiceABC0 == "on";)
  //GAMEPLAY LOOP
  else
    return readline.question(
      `\nManpower: ${greenText}${manPower}\n${resetText}\n{ORDERS}${yellowText}\n${playerOrdersListed}${resetText} \nWhat are your orders?`,
      (answer) => {
        // const lowercaseAnswer = answer.toLowerCase();

        if (answer == playerOrders[0]) {
          if (siegeRampAttack == "on") {
            console.log(
              `\n...General, the smooth incline of the pathway of our siege ramp has greatly facilitated our attack! A breakthrough is now only a matter of time!`
            );
          }
          console.log(
            `General, you ordered ${yellowText}${answer}.${resetText}`
          );

          if (siegeTowers > 1) {
            console.log(
              `\n...General, our siege towers loom over the battlefield. With this siege weaponary, our attack will be twice as effective!`
            );
          }
          if (cityDefenses < 2) {
            attackModifiers = attackModifiers + 2;
            espionageStatus == 1;
            console.log(
              `\n...It would seem that the enemy defenders have been caught off guard! Swathes of defenders were caught neglecting their stations in observance of the sun festival.`
            );
            cityDefenses = cityDefenses + 2;
          }

          if (siegeRams > 1) {
            cityWalls = "breached";
            console.log(`\n...Our rams have punched a hole through the wall!`);
          }

          if (siegeBallista > 1) {
            console.log(
              `\n...Our ballistae crew have proven their use by suprressing the enemy ontop of the walls! Let us press the attack.`
            );
          }
          if (siegeOnager > 0) {
            console.log(
              `\n...The onager has proven its usefulness in the assault by destroying enemy siege ontop of the walls.`
            );
          } else if (armyStatus == "tired") {
            attackModifiers = attackModifiers - 2;
            manPower = manPower - 1000;
            console.log(
              `\n...With tired men spearheading the assault, our attack was highly ineffective. Losses exceeded all of our advisor's estimates. \n Manpower: ${redText}${manPower}${resetText}
            `
            );
          }
          if (posternGate == 1) {
            attackModifiers = attackModifiers + 100;
            console.log(
              `${yellowText}{EVENT}\nAs agreed, the postern gate was left opened today. A handful selection of our finest warriors slipped into the wall while the rest of the army waited close to the gate. Bitter but brief fighting ensued, and our men came out victorious, securing the section of the wall for the rest of the army to pour in. Fierce fighting in the city streets commenced, but the defenders- caught off guard and panicked, were routed to the Citadel. In a final desperate stand, the remaining defending forces and a handful of civilian defenders gathered within the protective walls of the Citadel to put up a last ditch resistance. Our men, emboldened by their success thus far, pressed on relentlessly, determined to claim total victory. After 1 more hour of brutal combat, our men breached the defenses of the Citadel, overwhelming the exhausted defenders. The surviving defenders, realizing their cause was lost, surrendered to our ever victorious army.${resetText}`
            );
            manPower = manPower + 10000;
            attackModifiers = attackModifiers - 1000;
            cityDefenses = cityDefenses - 10000;
          } else if (attackModifiers <= 4)
            console.log(`\n...The attack has ${redText}failed.${resetText}`);
          if (siegeRampAttack == "on") {
            manPower = manPower -= randomAmountSiegeRamp;
          } else manPower = manPower -= randomAmount;
          console.log(`\n Manpower: ${redText}${manPower}${resetText}`);

          if (attackModifiers > 4) {
            manPower = manPower + 10000;
            console.log(`\n...\n\n${yellowText} {EVENT}\nWith our relentless assault, the weakened walls which had once withstood countless of attacks finally gave way. The enemy fought valiantly, but this time fortune favored the bold, and their defenses crumbled under the ferocity of our assault. Our men poured through the breached walls, engaging in fierce close quarters combat with the defenders. The sound of clashing swords and battle cries echoed through the streets as the assault quickly devolved into a slaughter. Women weeped on the streets, as their husbands were slain one by one by the relentless attacking force. As our men swept deeper into the heart of the city, the defenders- demoralized and overwhelmed, retreated towards their last stronghold, the Citadel. In a final desperate stand, the remaining defending forces and a handful of civilian defenders gathered within the protective walls of the Citadel. However, our men, emboldened by their success, pressed on relentlessly, determined to claim total victory. After hours of fierce combat, our men breached the defenses of the Citadel, overwhelming the exhausted defenders. The surviving defenders, realizing their cause was lost, surrendered to our ever victorious army.
          
          ${resetText}\n`);

            cityDefenses = cityDefenses - 10000;
          }
        }

        if (answer == playerOrders[1]) {
          console.log(
            `General, you ordered ${yellowText}${answer}.${resetText}`
          );
          console.log(
            `${yellowText}${engineeringArrayListed}${resetText} \nWhat would you like to build?\n`
          );
          readline.question(``, (answer) => {
            if (answer == engineeringArray[0]) {
              if (campStatus == "on") {
                console.log(
                  `General, you ordered ${yellowText}${answer}.${resetText} We already have a camp constructed!`
                );
                readline.question("", () => {
                  oneTurn();
                });
              } else {
                manPower = manPower - 250;
                campStatus = "on";
                console.log(
                  `General, you ordered ${yellowText}${answer}.${resetText} This order will take 250 men to see it through. With the camp, the recovery order will gain 500% effectiveness. \n Manpower: ${redText}${manPower}${resetText}.`
                );
              }
            }
            if (answer == engineeringArray[1]) {
              console.log(
                `General, you ordered ${yellowText}${answer}.${resetText}`
              );

              readline.question(
                `${yellowText}${projectsArrayListed}${resetText}.\nWhat projects would you like to build?\n`,
                (answer) => {
                  if (answer == projectsArray[0]) {
                    if (minesStatus == "on") {
                      console.log(
                        `General, you ordered ${yellowText}${answer}.${resetText} We already have a mining operation in process!`
                      );
                      readline.question("", () => {
                        oneTurn();
                      });
                    } else {
                      manPower = manPower - 3000;
                      minesStatus = "on";
                      console.log(
                        `General, you ordered ${yellowText}${answer}.${resetText} We will start immediately. This order will take 3000 men. \n Manpower: ${redText}${manPower}${resetText}.`
                      );
                    }
                  }
                  if (answer == projectsArray[1]) {
                    if (siegeRampStatus == "on") {
                      console.log(
                        `General, you ordered ${yellowText}${answer}.${resetText} We already have a siege ramp under construction!`
                      );
                      readline.question("", () => {
                        oneTurn();
                      });
                    } else {
                      manPower = manPower - 3000;
                      siegeRampStatus = "on";
                      console.log(
                        `General, you ordered ${yellowText}${answer}.${resetText} We will start immediately. This order will take 3000 men. \n Manpower: ${redText}${manPower}${resetText}.`
                      );
                    }
                  }
                  if (answer == projectsArray[2]) {
                    if (pallisadesStatus == "on") {
                      console.log(
                        `General, you ordered ${yellowText}${answer}.${resetText} We already have a palisade wall constructed!`
                      );
                      readline.question("", () => {
                        oneTurn();
                      });
                    } else if (campStatus == "on") {
                      pallisadesStatus = "on";
                      manPower = manPower - 500;
                      console.log(
                        `General, you ordered ${yellowText}${answer}.${resetText} This order will further fortify our camp and take 500 men. \n Manpower: ${redText}${manPower}${resetText}.`
                      );
                    } else {
                      console.log(
                        `General, you ordered ${yellowText}${answer}.${resetText} We have to build a camp first!`
                      );
                      readline.question("", () => {
                        oneTurn();
                      });
                    }
                  }

                  if (manPower < 3500) {
                    console.log(
                      `${yellowText}{EVENT}\nGeneral, your army has been dealt a severe blow. You will face the high king's wrath and be skinned alive. \n\n
                      DEFEAT${resetText}`
                    );
                  }
                  readline.question(
                    "\n...\nas orders are carried out, the day draws to a close. \n Press Enter to continue:",
                    (answer) => {
                      turnDay = turnDay + 1;
                      console.log(`\n${greenText}Day ${turnDay}${resetText}`);
                      oneTurn();
                    }
                  );
                }
              );
            }
            if (answer == engineeringArray[2]) {
              console.log(
                `General, you ordered ${yellowText}${answer}.${resetText}`
              );
              readline.question(
                `${yellowText}${siegeWeaponsArrayListed}${resetText} \nWhat weapons would you like to build?\n`,
                (answer) => {
                  if (answer == siegeWeaponsArray[0]) {
                    siegeTowers = siegeTowers + 1;
                    attackModifiers = attackModifiers + 1;
                    console.log(
                      `General, you ordered ${yellowText}${answer}.${resetText} 1 siege tower will be constructed.`
                    );
                  }
                  if (answer == siegeWeaponsArray[1]) {
                    siegeRams = siegeRams + 1;
                    attackModifiers = attackModifiers + 1;
                    console.log(
                      `General, you ordered ${yellowText}${answer}.${resetText} 1 Ram will be constructed.`
                    );
                  }
                  if (answer == siegeWeaponsArray[2]) {
                    siegeBallista = siegeBallista + 2;
                    attackModifiers = attackModifiers + 1;
                    console.log(
                      `General, you ordered ${yellowText}${answer}.${resetText} 2 ballistae will be constructed.`
                    );
                  }
                  if (answer == siegeWeaponsArray[3]) {
                    siegeOnager = siegeOnager + 1;
                    attackModifiers = attackModifiers + 1;
                    console.log(
                      `General, you ordered ${yellowText}${answer}.${resetText} 1 onager will be constructed.`
                    );
                  }
                  if (manPower < 3500) {
                    console.log(
                      `${yellowText}{EVENT}\nGeneral, your army has been dealt a severe blow. You will face the high king's wrath and be skinned alive. \n\n
                      DEFEAT${resetText}`
                    );
                  }
                  readline.question(
                    "\n...\nas orders are carried out, the day draws to a close. \n Press Enter to continue:",
                    (answer) => {
                      turnDay = turnDay + 1;
                      console.log(`\n${greenText}Day ${turnDay}${resetText}`);
                      oneTurn();
                    }
                  );
                }
              );
            }
            if (manPower < 3500) {
              console.log(
                `${yellowText}{EVENT}\nGeneral, your army has been dealt a severe blow. You will face the high king's wrath and be skinned alive. \n\n
                DEFEAT${resetText}`
              );
            }
            readline.question(
              "\n...\nas orders are carried out, the day draws to a close. \n Press Enter to continue:",
              (answer) => {
                turnDay = turnDay + 1;
                console.log(`\n${greenText}Day ${turnDay}${resetText}`);
                oneTurn();
              }
            );
          });
        }

        if (answer == playerOrders[2]) {
          espionageStatus = espionageStatus + 1;

          if (espionageStatus > 3) {
            cityDefenses = cityDefenses - 2;
            console.log(
              `${greenText}{Spy Report}${resetText}\n**General, our spy reports a holy festival will take place tomorrow. It is predicted that city defenses will be in a weakened state during the week-long festivities. With this information, it may be wise for us to attack.**`
            );
          } else
            console.log(
              `General, you ordered ${yellowText}${answer}.${resetText} Espionage operations will be conducted and a report will be generated in the next few days.`
            );
        }

        if (answer == playerOrders[3]) {
          if (campStatus == "on") {
            manPower = manPower + 500;
          } else manPower = manPower + 100;
          console.log(
            `General, you ordered ${yellowText}${answer}.${resetText}\n Manpower: ${greenText}${manPower}${resetText}`
          );
        }

        if (manPower < 3500) {
          console.log(
            `${yellowText}{EVENT}\nGeneral, your army has been dealt a severe blow. You will face the high king's wrath and be skinned alive. \n\n
            DEFEAT${resetText}`
          );
        } else if (cityDefenses < -1000) {
          console.log(`\n${yellowText}VICTORY${resetText}`);
        } else
          readline.question(
            "\n...\nas orders are carried out, the day draws to a close. \n Press Enter to continue:",
            (answer) => {
              turnDay = turnDay + 1;
              console.log(`\n${greenText}Day ${turnDay}${resetText}`);
              oneTurn();
            }
          );
      }
    );
}
oneTurn();
