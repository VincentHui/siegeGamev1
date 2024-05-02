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
