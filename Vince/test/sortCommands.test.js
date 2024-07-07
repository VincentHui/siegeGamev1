const { playerCommands, SortCommands } = require("../player");
const {
  redText,
  yellowText,
  BasicBlue,
  resetText,
} = require("../../common/colors");

test("sort commands to make defense first", () => {
  const defend = playerCommands.filter((cmd) => cmd.name === "defend")[0];
  const shoot = playerCommands.filter((cmd) => cmd.name === "shoot")[0];
  const reload = playerCommands.filter((cmd) => cmd.name === "reload")[0];

  let commands = [];
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
  commands.push({ command: reload, playerShooter });
  commands.push({ command: shoot, playerShooter });
  commands.push({ command: defend, playerTarget });
  commands.sort(SortCommands);
  console.log(commands);
  expect(commands[0].command.name).toBe(defend.name);
});
