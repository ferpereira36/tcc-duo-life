import { ExpensesProps } from '@/types/ExpensesProps'

export type groupStorageProps = {
  groupId: string
  groupExpenses: { [key: string]: ExpensesProps[] }
  groupSalaries: {
    salaryOne: string
    salaryTwo: string
  }
  groupAccountDivision: string
  groupName: string
  groupMemberOneId: string
  groupMemberOneName: string
  groupMemberTwoId: string
  groupMemberTwoName: string
}
