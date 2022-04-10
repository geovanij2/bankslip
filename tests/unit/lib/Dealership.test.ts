import { Dealership } from "../../../lib";

describe("Dealership.isValid() unit tests", () => {
  it("Should return true", () => {
    expect(
      new Dealership(
        "858200000015333203852201770716220607710903749809"
      ).isValid()
    ).toBe(true);

    expect(
      new Dealership(
        "846700000017435900240209024050002435842210108119"
      ).isValid()
    ).toBe(true);

    expect(
      new Dealership(
        "836400000011331201380002812884627116080136181551"
      ).isValid()
    ).toBe(true);
  });

  it("Should return false", () => {
    expect(
      new Dealership(
        "836400000012331201380002812884627116080136181551"
      ).isValid()
    ).toBe(false);

    expect(
      new Dealership(
        "858900004608524601791605607593050865831483000010"
      ).isValid()
    ).toBe(false);
  });
});

describe("Dealership.amount() unit tests", () => {
  it("Should return correct amount", () => {
    expect(
      new Dealership(
        "858200000015333203852201770716220607710903749809"
      ).amount()
    ).toBe("133.32");

    expect(
      new Dealership(
        "846700000017435900240209024050002435842210108119"
      ).amount()
    ).toBe("143.59");

    expect(
      new Dealership(
        "836400000011331201380002812884627116080136181551"
      ).amount()
    ).toBe("133.12");
  });
});

describe("Dealership.expirationDate() unit tests", () => {
  it("Should return correct expiration date", () => {
    expect(
      new Dealership(
        "858200000015333203852201770716220607710903749809"
      ).expirationDate()
    ).toBe(undefined);

    expect(
      new Dealership(
        "846700000017435900240209024050002435842210108119"
      ).expirationDate()
    ).toBe(undefined);

    expect(
      new Dealership(
        "836400000011331201380002812884627116080136181551"
      ).expirationDate()
    ).toBe(undefined);
  });
});

describe("Dealership.barCode() unit tests", () => {
  it("Should generate correct barCode", () => {
    expect(
      new Dealership(
        "858200000015333203852201770716220607710903749809"
      ).barCode()
    ).toBe("85820000001333203852207707162206071090374980");

    expect(
      new Dealership(
        "846700000017435900240209024050002435842210108119"
      ).barCode()
    ).toBe("84670000001435900240200240500024384221010811");
  });
});
