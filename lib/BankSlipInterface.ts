export interface BankSlipInterface {
  isValid(): boolean;
  barCode(): string;
  amount(): string;
  expirationDate(): string | undefined;
}
