const MyTurn = { currentplayer: 2 };
const NotMyTurn = { notmyturn: 1 };

let GameState = [
  1,
  (Player1 = {
    HP: 100,
    Mana: 10,
    Initiative: 1,
    WastrelsWrath: 0,
    bloodhex: 0,
  }), //0
  (Player2 = {
    HP: 100,
    Mana: 10,
    Initiative: 1,
    WastrelsWrath: 0,
    bloodhex: 0,
  }), //1
];
let changeturn = [{}];
module.exports = {
  GameState,
  MyTurn,
  NotMyTurn,
};
