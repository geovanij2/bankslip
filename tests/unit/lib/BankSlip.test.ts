import { BankSlip } from "../../../lib";

describe("BankSlip.isValid() unit tests", () => {
  it("Should return true", () => {
    expect(
      new BankSlip("21290001192110001210904475617405975870000002000").isValid()
    ).toBe(true);

    expect(
      new BankSlip("00190500954014481606906809350314337370000000100").isValid()
    ).toBe(true);

    expect(
      new BankSlip("42297115040000195441160020034520268610000054659").isValid()
    ).toBe(true);

    expect(
      new BankSlip("03399563444150001042032182601016189540000028851").isValid()
    ).toBe(true);
  });

  it("Should return false", () => {
    expect(
      new BankSlip("92297115040000195441160020034520268610000054659").isValid()
    ).toBe(false);

    expect(
      new BankSlip("422971150400001954411600200345202686100000546590").isValid()
    ).toBe(false);
  });
});

describe("BankSlip.amount() unit tests", () => {
  it("Should return correct amount", () => {
    expect(
      new BankSlip("03399563444150001042032182601016189540000028851").amount()
    ).toBe("288.51");

    expect(
      new BankSlip("21290001192110001210904475617405975870000002000").amount()
    ).toBe("20.00");

    expect(
      new BankSlip("00190500954014481606906809350314337370000000100").amount()
    ).toBe("1.00");

    expect(
      new BankSlip("42297115040000195441160020034520268610000054659").amount()
    ).toBe("546.59");
  });
});

describe("BankSlip.expirationDate() unit tests", () => {
  it("Should return correct expiration date", () => {
    expect(
      new BankSlip(
        "03399563444150001042032182601016189540000028851"
      ).expirationDate()
    ).toBe("2022-04-13");

    expect(
      new BankSlip(
        "21290001192110001210904475617405975870000002000"
      ).expirationDate()
    ).toBe("2018-07-16");

    expect(
      new BankSlip(
        "00190500954014481606906809350314337370000000100"
      ).expirationDate()
    ).toBe("2007-12-31");

    expect(
      new BankSlip(
        "42297115040000195441160020034520268610000054659"
      ).expirationDate()
    ).toBe("2016-07-20");
  });
});

describe("BankSlip.barCode() unit tests", () => {
  it("Should generate correct barCode", () => {
    expect(
      new BankSlip("21290001192110001210904475617405975870000002000").barCode()
    ).toBe("21299758700000020000001121100012100447561740");

    expect(
      new BankSlip("23790448095616862379336011058009740430000124020").barCode()
    ).toBe("23797404300001240200448056168623793601105800");
  });
});
