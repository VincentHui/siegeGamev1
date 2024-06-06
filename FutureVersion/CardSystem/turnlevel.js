let Manpower = 2000;

function Turnbase(turn, numberofturns) {
  for (let i = turn; i < numberofturns; i++) {
    console.log([turn]);
    Manpower = Manpower + 1000;
    console.log("You have", Manpower, "men");
    turn++;
  }
}

Turnbase(2, 20);
