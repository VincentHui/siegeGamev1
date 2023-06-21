/**
 * This function starts a turn and calls the dailyCallback for every dayTurn
 * @param {number} dayTurn - The current day turn of the game
 * @param {(dayTurn:number)=>boolean} dailyCallback - A callback function that is called every dayTurn returns true when the game is over
 */
function startTurn(dayTurn = 0, dailyCallback) {
  // Call the daily callback with the current day turn
  const endGame = dailyCallback(dayTurn);
  // Increment the day turn
  dayTurn = dayTurn + 1;
  // If the game has ended, log "gameOver" and return
  if (endGame) {
    console.log("gameOver");
    return;
  }
  // Start the next turn
  startTurn(dayTurn, dailyCallback);
}

module.exports = {
  startTurn,
};
