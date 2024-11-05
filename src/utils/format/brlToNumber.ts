export function brlToNumber(value: string): number {
  return parseFloat(value.replace(/\./g, '').replace(',', '.'))
}
