function startTurn(dayTurn = 0, dailyCallback) {
  //   if (dayTurn >= 4) {
  //     console.log("end");
  //     return;
  //   }

  dailyCallback(dayTurn);
  dayTurn = dayTurn + 1;
  startTurn(dayTurn, dailyCallback);
}

module.exports = {
  startTurn,
};
