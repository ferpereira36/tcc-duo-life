import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { brlToNumber } from '@/utils/format/brlToNumber'

export function totalSalaries() {
  const storageGroup = storageService.getItem<groupStorageProps>('group')
  const salaryOne = storageGroup?.groupSalaries?.salaryOne
  const salaryTwo = storageGroup?.groupSalaries?.salaryTwo
  let salaryOneNumber = 0
  let salaryTwoNumber = 0
  if (salaryOne) {
    salaryOneNumber = brlToNumber(salaryOne) || 0
  }
  if (salaryTwo) {
    salaryTwoNumber = brlToNumber(salaryTwo) || 0
  }

  const totalSalary: number = salaryOneNumber + salaryTwoNumber
  return totalSalary
}
