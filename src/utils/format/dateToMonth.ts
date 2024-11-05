import { nameMonth } from '@/utils/month/nameMonth'

export function dateToMonth(date: Date): string {
  const dateFormat = date.toLocaleDateString('pt-BR')

  const monthNumber = dateFormat.split('/')[1]
  const month = nameMonth[parseInt(monthNumber, 10) - 1]
  return month
}
