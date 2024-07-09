const { playerCommands } = require("../Player/player");
const {
  redText,
  yellowText,
  BasicBlue,
  resetText,
} = require("../../common/colors");

test("return fire against a player", () => {
  const playerTarget = {
    name: "target",
    color: redText,
    ai: true,
    bullets: 0,
    health: 1,
  };
  const playerShooter = {
    name: "shooter",
    color: BasicBlue,
    ai: true,
    bullets: 1,
    health: 1,
  };
  const shoot = playerCommands.filter((cmd) => cmd.name === "shoot")[0];
  playerShooter.target = playerTarget;

  shoot.effect(playerShooter);
  expect(playerShooter.bullets).toBe(0);
  expect(playerTarget.health).toBe(0);
});
