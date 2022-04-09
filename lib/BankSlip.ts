import { BankSlipInterface } from "./BankSlipInterface";
import { isAllDigit, sumDigitsUntilOne } from "./utils";

export class BankSlip implements BankSlipInterface {
  private line;
  private IFCode;
  private currencyCode;
  private barCode1;
  private barCode2;
  private barCode3;
  private vdField1;
  private vdField2;
  private vdField3;
  private vdBarCode;
  private expiryFactor;
  private value;
  private field1;
  private field2;
  private field3;

  constructor(str: string) {
    if (!isAllDigit(str) && str.length !== 47)
      throw new Error("Invalid input string for BankSlip");

    this.line = str.split("").map(Number);
    this.IFCode = this.line.slice(0, 3);
    this.currencyCode = this.line[3];
    this.barCode1 = this.line.slice(4, 9);
    this.vdField1 = this.line[9];
    this.barCode2 = this.line.slice(10, 20);
    this.vdField2 = this.line[20];
    this.barCode3 = this.line.slice(21, 31);
    this.vdField3 = this.line[31];
    this.vdBarCode = this.line[32];
    this.expiryFactor = this.line.slice(33, 37);
    this.value = this.line.slice(37);
    this.field1 = this.line.slice(0, 9);
    this.field2 = this.line.slice(10, 20);
    this.field3 = this.line.slice(21, 31);
  }

  isValid(): boolean {
    const factor1 = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const factor2 = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

    if (this.calculateFieldVDMod10(this.field1, factor1) !== this.vdField1)
      return false;

    if (this.calculateFieldVDMod10(this.field2, factor2) !== this.vdField2)
      return false;

    if (this.calculateFieldVDMod10(this.field3, factor2) !== this.vdField3)
      return false;

    if (Number.parseInt(this.barCode()[4]) !== this.calculateBarCodeVDMod11())
      return false;

    return true;
  }

  barCode(): string {
    const barCode = this.IFCode.concat(
      this.currencyCode,
      this.vdBarCode,
      this.expiryFactor,
      this.value,
      this.barCode1,
      this.barCode2,
      this.barCode3
    );
    return barCode.join("");
  }

  amount(): string {
    return (
      Number.parseInt(this.value.slice(0, 8).join("")) +
      "." +
      this.value.slice(8).join("")
    );
  }

  expirationDate(): string | undefined {
    if (this.expiryFactor[0] === 0) return undefined;

    const baseDate = new Date(1997, 9, 7);

    const numDays = Number.parseInt(this.expiryFactor.join(""));

    return new Date(baseDate.getTime() + 1000 * 60 * 60 * 24 * numDays)
      .toJSON()
      .slice(0, 10);
  }

  private calculateFieldVDMod10(field: number[], factor: number[]): number {
    if (field.length !== factor.length)
      throw new Error("Field and Factor must have same length!");

    let sum = 0;
    for (let i = 0; i < field.length; i++) {
      sum += sumDigitsUntilOne(field[i] * factor[i]);
    }

    const res = 10 - (sum % 10);

    return res === 10 ? 0 : res;
  }

  private calculateBarCodeVDMod11(): number {
    const multiplierMask = [
      4, 3, 2, 9, 0, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5,
      4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
    ];

    const barCode = this.barCode();

    let aux = 0;
    for (let i = 0; i < barCode.length; i++) {
      aux += Number.parseInt(barCode[i]) * multiplierMask[i];
    }
    aux = 11 - (aux % 11);

    if (aux === 0 || aux === 10 || aux === 11) aux = 1;

    return aux;
  }
}
