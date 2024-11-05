export function stringToNumber(text: string) {
  const cleaned = text.replace(/\D/g, '')
  let formattedValue = (Number(cleaned) / 100).toFixed(2)
  formattedValue = formattedValue
    .replace('.', ',') // Troca ponto por vírgula
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return formattedValue
}
