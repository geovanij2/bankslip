import { BankSlip, Dealership } from "../../../lib";

export function getBankSlipInfo(digits: string) {
  const bankSlip =
    digits.length === 47 ? new BankSlip(digits) : new Dealership(digits);

  if (!bankSlip.isValid()) throw new Error("Invalid digit line");

  return {
    barCode: bankSlip.barCode(),
    amount: bankSlip.amount(),
    expirationDate: bankSlip.expirationDate(),
  };
}
