import { BankSlipInterface, BankSlip, Dealership } from "../lib";

function main(str: string) {
  const foo: BankSlipInterface =
    str.length === 47 ? new BankSlip(str) : new Dealership(str);

  if (!foo.isValid()) throw "err";

  return {
    barCode: foo.barCode(),
    amount: foo.amount(),
    expirationDate: foo.expirationDate(),
  };
}

console.log(main("21290001192110001210904475617405975870000002000"));
console.log(main("00190500954014481606906809350314337370000000100"));

console.log(main("846700000017435900240209024050002435842210108119"));
