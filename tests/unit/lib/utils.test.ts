import { isAllDigit, sumDigitsUntilOne } from "../../../lib";

describe("isAllDigit unit tests", () => {
  it("Should return true", () => {
    expect(isAllDigit("1111111111111111111111111111111111111111")).toBe(true);
    expect(isAllDigit("1")).toBe(true);
    expect(isAllDigit("2")).toBe(true);
    expect(isAllDigit("3")).toBe(true);
    expect(isAllDigit("4")).toBe(true);
    expect(isAllDigit("5")).toBe(true);
    expect(isAllDigit("6")).toBe(true);
    expect(isAllDigit("7")).toBe(true);
    expect(isAllDigit("8")).toBe(true);
    expect(isAllDigit("9")).toBe(true);
    expect(isAllDigit("982973981273981")).toBe(true);
    expect(isAllDigit("9318923")).toBe(true);
    expect(isAllDigit("94141")).toBe(true);
  });

  it("Should return false", () => {
    expect(isAllDigit("")).toBe(false);
    expect(isAllDigit("a")).toBe(false);
    expect(isAllDigit("dsadad")).toBe(false);
    expect(isAllDigit("aa3")).toBe(false);
    expect(isAllDigit("4aa")).toBe(false);
    expect(isAllDigit("5bfd555")).toBe(false);
  });
});

describe("sumDigitsUntilOne unit tests", () => {
  it("", () => {
    expect(sumDigitsUntilOne(1)).toBe(1);
    expect(sumDigitsUntilOne(2)).toBe(2);
    expect(sumDigitsUntilOne(3)).toBe(3);
    expect(sumDigitsUntilOne(4)).toBe(4);
    expect(sumDigitsUntilOne(5)).toBe(5);
    expect(sumDigitsUntilOne(6)).toBe(6);
    expect(sumDigitsUntilOne(7)).toBe(7);
    expect(sumDigitsUntilOne(8)).toBe(8);
    expect(sumDigitsUntilOne(9)).toBe(9);
    expect(sumDigitsUntilOne(0)).toBe(0);
    expect(sumDigitsUntilOne(18)).toBe(9);
    expect(sumDigitsUntilOne(14124)).toBe(3);
  });
});
