export function riskColor(value: number) {
  if (value < 50) return 'green';
  if (value < 70) return 'yellow';
  return 'red';
}
