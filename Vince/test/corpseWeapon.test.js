const { playerCommands } = require("../Player/player");
const { redText, BasicBlue } = require("../../common/colors");
const { pubsub } = require("../../common/pubSub");
const { Weapons } = require("../Weapons/chooseWeapon");

test("the holder of corpse should have 5 health, take damage on reload, have bullets per reload and on death harm others", () => {
  const reload = playerCommands.filter((cmd) => cmd.name === "reload")[0];
  const playerTarget = {
    name: "target",
    color: redText,
    ai: true,
    bullets: 0,
    health: 1,
    inventory: [],
  };
  const weapon = Weapons.filter((weapon) => weapon.name === "corpse")[0];
  playerTarget.inventory.push(weapon);
  weapon.onGiven(playerTarget);
  expect(playerTarget.health).toBe(5);
  reload.effect(playerTarget);
  expect(playerTarget.bullets).toBe(2);

  const playerShooter = {
    name: "shooter",
    color: BasicBlue,
    ai: true,
    bullets: 1,
    health: 1,
  };

  pubsub.publish("playerDied", {
    deadplayer: playerTarget,
    players: [playerShooter],
  });

  expect(playerShooter.health).toBe(0);
});
