let Progress = {
  playerPosition: 0,
  Map: ["Countryside", "Trenches", "Walls", "The Tower", "Town", "The Citadel"],
  defenderAllocations: {
    Countryside: 0,
    Trenches: 0,
    Walls: 0,
    "The Tower": 0,
    Town: 0,
    "The Citadel": 0,
  },
};
// console.log(Progress.Map[1]);
module.exports = { Progress };
