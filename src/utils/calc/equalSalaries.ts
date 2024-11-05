import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { numberToBRL } from '@/utils/format/numberToBRL'
import { totalExpenses } from '@/utils/calc/totalExpenses'

export const equalSalaries = (month: string) => {
  const storageGroup = storageService.getItem<groupStorageProps>('group')
  const salaryOneString = storageGroup?.groupSalaries.salaryOne || '0,00'
  const salaryTwoString = storageGroup?.groupSalaries.salaryTwo || '0,00'
  let salaryOneEqual = '0,00'
  let salaryTwoEqual = '0,00'
  try {
    const totalExpense = totalExpenses(month)
    if (salaryOneString !== '0,00' && salaryTwoString !== '0,00') {
      salaryOneEqual = numberToBRL(0.5 * totalExpense)
      salaryTwoEqual = numberToBRL(0.5 * totalExpense)
    }
    if (salaryOneString !== '0,00' && salaryTwoString === '0,00') {
      salaryOneEqual = numberToBRL(totalExpense)
    }
    if (salaryOneString === '0,00' && salaryTwoString !== '0,00') {
      salaryTwoEqual = numberToBRL(totalExpense)
    }
  } catch (error) {
    console.error(error)
  }
  return {
    salaryOneEqual,
    salaryTwoEqual,
  }
}
