import { storageService } from '@/services/storage/storageService'
import { ExpensesProps } from '@/types/ExpensesProps'
import { groupStorageProps } from '@/types/storage/group'

export function expensesWithId(idMember: string, month: string): number {
  try {
    const storageGroup = storageService.getItem<groupStorageProps>('group')
    const currentExpenses = storageGroup?.groupExpenses

    if (currentExpenses && currentExpenses[month]) {
      const data = currentExpenses[month].filter(
        (expense: ExpensesProps) => expense.owner_id === idMember,
      )

      const total = data.reduce((acc: number, expense: ExpensesProps) => {
        const numericValue = parseFloat(
          expense.value.replace('.', '').replace(',', '.'),
        )
        return acc + numericValue
      }, 0)

      return total
    }

    return 0
  } catch (error) {
    console.error('Error calculating expenses:', error)
    return 0
  }
}
