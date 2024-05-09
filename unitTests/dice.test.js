const {
  diceRoll,
} = require("../FutureVersion/CardSystem/examples/diceExample");

test("if 2 dice are rolled result array should always be 2", () => {
  let totalCalls = 0;
  for (let i = 0; i < 100; i++) {
    const rollResult = diceRoll(2, 12);
    expect(rollResult).toHaveLength(2);
    totalCalls = totalCalls + 1;
  }
  expect(totalCalls).toBe(100);
});

test("if 2 dice are rolled with 12 sides, each dice should roll more that", () => {
  let totalCalls = 0;
  for (let i = 0; i < 100; i++) {
    const rollResult = diceRoll(2, 12);
    rollResult.forEach((element) => {
      expect(element).toBeLessThan(13);
      expect(element).toBeGreaterThan(0);
    });
    totalCalls = totalCalls + 1;
  }
  expect(totalCalls).toBe(100);
});

test("if 3 8 sided dice are rolled, the total value of the dice should be less than 24", () => {
  let totalCalls = 0;
  for (let i = 0; i < 50; i++) {
    const rollResult = diceRoll(3, 8);
    rollResult.forEach((element) => {
      expect(rollResult).toBeLessThan(24);
      expect(element).toBeGreaterThan(0);
    });
    totalCalls = totalCalls + 1;
  }
  expect(totalCalls).toBe(50);
});
