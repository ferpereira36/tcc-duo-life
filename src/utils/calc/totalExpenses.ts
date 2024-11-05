import { storageService } from '@/services/storage/storageService'
import { ExpensesProps } from '@/types/ExpensesProps'
import { groupStorageProps } from '@/types/storage/group'

export function totalExpenses(month: string) {
  const storageGroup = storageService.getItem<groupStorageProps>('group')
  const currentExpenses = storageGroup?.groupExpenses
  try {
    if (currentExpenses) {
      // Usa reduce para somar os valores
      const total = currentExpenses[month]
        .map((item: ExpensesProps) =>
          Number(item.value.replace(/\./g, '').replace(',', '.')),
        ) // Converte o valor de string para número
        .reduce((acc: number, value: number) => acc + value, 0) // Soma todos os valores

      return total
    } else {
      return 0
    }
  } catch (error) {
    return 0
  }
}
