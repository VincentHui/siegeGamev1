const { playerCommands } = require("../player");
const {
  redText,
  yellowText,
  BasicBlue,
  resetText,
} = require("../../common/colors");

test("defend against a player shooting", () => {
  const defend = playerCommands.filter((cmd) => cmd.name === "defend")[0];
  const playerTarget = {
    name: "target",
    color: redText,
    ai: true,
    bullets: 0,
    health: 1,
  };
  defend.effect(playerTarget);

  const playerShooter = {
    name: "shooter",
    color: BasicBlue,
    ai: true,

    bullets: 1,
    health: 1,
  };
  const shoot = playerCommands.filter((cmd) => cmd.name === "shoot")[0];
  shoot.effect(playerShooter, [playerTarget]);
  expect(playerShooter.bullets).toBe(0);
  expect(playerTarget.health).toBe(1);
});
