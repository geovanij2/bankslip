import { BankSlipInterface } from "./BankSlipInterface";
import { isAllDigit, sumDigitsUntilOne } from "./utils";

export class Dealership implements BankSlipInterface {
  private line;

  private productId;
  private segmentId;
  private realOrRefId;
  private barCodeVD;
  private value;
  private companyId; // public agency id (4 digits) / cnpj (8 digits)
  private freeField; // 25 digits or 21 digits

  private field1;
  private field2;
  private field3;
  private field4;
  private vdField1;
  private vdField2;
  private vdField3;
  private vdField4;

  constructor(str: string) {
    if (!isAllDigit(str) || str.length !== 48)
      throw new Error("Invalid input string for Dealership");

    this.line = str.split("").map(Number);

    this.field1 = this.line.slice(0, 11);
    this.vdField1 = this.line[11];
    this.field2 = this.line.slice(12, 23);
    this.vdField2 = this.line[23];
    this.field3 = this.line.slice(24, 35);
    this.vdField3 = this.line[35];
    this.field4 = this.line.slice(36, 47);
    this.vdField4 = this.line[47];

    this.productId = this.line[0];
    this.segmentId = this.line[1];
    this.realOrRefId = this.line[2];
    this.barCodeVD = this.line[3];
    this.value = this.line.slice(4, 11).concat(this.line.slice(12, 16));

    if (this.segmentId === 6) {
      // abcdeeeeeee   eeeefffffff   fgggggggggg   ggggggggggg
      // 84670000001-7 43590024020-9 02405000243-5 84221010811-9
      // cnpj
      this.companyId = this.line.slice(16, 23).concat(this.line.slice(24, 25)); // 8 digits
      this.freeField = this.line.slice(25, 35).concat(this.line.slice(36, 47)); // 21 digits
    } else {
      // abcdeeeeeee   eeeeffffggg   ggggggggggg   ggggggggggg
      // 84670000001-7 43590024020-9 02405000243-5 84221010811-9
      this.companyId = this.line.slice(16, 20); // 4 digits
      this.freeField = this.line
        .slice(20, 23)
        .concat(this.line.slice(24, 35), this.line.slice(36, 47));
    }
  }
  isValid(): boolean {
    const barCode = this.barCode().split("").map(Number);

    if (this.realOrRefId === 6 || this.realOrRefId === 7) {
      // mod 10
      const fieldFactor = [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
      const barCodeFactor = [
        2, 1, 2, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
      ];

      if (this.calculateVDMod10(this.field1, fieldFactor) !== this.vdField1)
        return false;
      if (this.calculateVDMod10(this.field2, fieldFactor) !== this.vdField2)
        return false;
      if (this.calculateVDMod10(this.field3, fieldFactor) !== this.vdField3)
        return false;
      if (this.calculateVDMod10(this.field4, fieldFactor) !== this.vdField4)
        return false;
      if (this.calculateVDMod10(barCode, barCodeFactor) !== this.barCodeVD)
        return false;
    } else {
      // mod 11
      const fieldFactor = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const barCodeFactor = [
        4, 3, 2, 0, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6,
        5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
      ];

      if (this.calculateVDMod11(this.field1, fieldFactor) !== this.vdField1)
        return false;
      if (this.calculateVDMod11(this.field2, fieldFactor) !== this.vdField2)
        return false;
      if (this.calculateVDMod11(this.field3, fieldFactor) !== this.vdField3)
        return false;
      if (this.calculateVDMod11(this.field4, fieldFactor) !== this.vdField4)
        return false;
      if (this.calculateVDMod11(barCode, barCodeFactor) !== this.barCodeVD)
        return false;
    }

    return true;
  }
  barCode(): string {
    const barCode = this.field1.concat(this.field2, this.field3, this.field4);

    return barCode.join("");
  }
  amount(): string {
    if (this.realOrRefId === 6 || this.realOrRefId === 8) {
      return (
        Number.parseInt(this.value.slice(0, 9).join("")) +
        "." +
        this.value.slice(9, 11).join("")
      );
    } else {
      // todo checar o que fazer nesse caso
      return (
        Number.parseInt(this.value.slice(0, 9).join("")) +
        "." +
        this.value.slice(9, 11).join("")
      );
    }
  }
  expirationDate(): string | undefined {
    // if exists AAAAMMDD from the beggining of the freeField

    const year = this.freeField.slice(0, 4).join("");
    const month = this.freeField.slice(4, 6).join("");
    const day = this.freeField.slice(6, 8).join("");

    if (
      Number.parseInt(year) > 1997 &&
      Number.parseInt(month) > 0 &&
      Number.parseInt(month) < 13 &&
      Number.parseInt(day) > 0 &&
      Number.parseInt(day) < 32
    )
      return year + "-" + month + "-" + day;

    return undefined;
  }

  private calculateVDMod10(field: number[], factor: number[]): number {
    if (field.length !== factor.length)
      throw new Error("Field and factor must have same length");

    let sum = 0;
    for (let i = 0; i < field.length; i++) {
      sum += sumDigitsUntilOne(field[i] * factor[i]);
    }

    const res = 10 - (sum % 10);

    return res === 10 ? 0 : res;
  }

  private calculateVDMod11(field: number[], factor: number[]): number {
    if (field.length !== factor.length)
      throw new Error("Field and factor must have same length");

    let sum = 0;
    for (let i = 0; i < field.length; i++) {
      sum += field[i] * factor[i];
    }

    const rem = sum % 11;

    switch (rem) {
      case 0:
      case 1:
        return 0;
      case 10:
        return 1;
      default:
        return 11 - rem;
    }
  }
}
