import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { brlToNumber } from '@/utils/format/brlToNumber'
import { numberToBRL } from '@/utils/format/numberToBRL'
import { totalExpenses } from '@/utils/calc/totalExpenses'
import { totalSalaries } from '@/utils/calc/totalSalaries'

export const proporcionalSalaries = (month: string) => {
  const storageGroup = storageService.getItem<groupStorageProps>('group')
  const salaryOneString = storageGroup?.groupSalaries.salaryOne || '0,00'
  const salaryTwoString = storageGroup?.groupSalaries.salaryTwo || '0,00'
  let salaryOnePercentual = '0,00'
  let salaryTwoPercentual = '0,00'
  try {
    if (salaryOneString && salaryTwoString) {
      const salaryOne = brlToNumber(salaryOneString)
      const salaryTwo = brlToNumber(salaryTwoString)
      const totalSalariesGroup = totalSalaries()
      const totalExpense = totalExpenses(month)
      if (salaryOneString !== '0,00') {
        salaryOnePercentual = numberToBRL(
          (salaryOne / totalSalariesGroup) * totalExpense,
        )
      }
      if (salaryTwoString !== '0,00') {
        salaryTwoPercentual = numberToBRL(
          (salaryTwo / totalSalariesGroup) * totalExpense,
        )
      }
    }
  } catch (error) {
    console.error(error)
  }
  return {
    salaryOnePercentual,
    salaryTwoPercentual,
  }
}
