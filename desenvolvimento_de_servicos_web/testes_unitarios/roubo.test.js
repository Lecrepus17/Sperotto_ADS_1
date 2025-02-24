const { imposto } = require("./roubo");

test("imposto", () => {
  expect(imposto(1111)).toBe(0);
  expect(imposto(2500)).toBe(18.06);
  expect(imposto(3000)).toBe(68.56);
  expect(imposto(4000)).toBe(237.23);
  expect(imposto(5000)).toBe(479);
});
