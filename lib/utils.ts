export function isAllDigit(str: string): boolean {
  return /^\d+$/.test(str);
}

export function sumDigitsUntilOne(num: number): number {
  if (num < 10) return num;

  let sum = 0;

  while (num) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }

  return sumDigitsUntilOne(sum);
}
