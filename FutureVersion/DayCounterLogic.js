function startTurn(dayTurn = 0, dailyCallback) {
  //   if (dayTurn >= 4) {
  //     console.log("end");
  //     return;
  //   }

  const endGame = dailyCallback(dayTurn);
  dayTurn = dayTurn + 1;
  if (endGame) {
    console.log("gameOver");
    return;
  }
  startTurn(dayTurn, dailyCallback);
}

module.exports = {
  startTurn,
};
