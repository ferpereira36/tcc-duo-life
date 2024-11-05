import { ExpensesProps } from '@/types/ExpensesProps'
import { groupStorageProps } from '@/types/storage/group'
import { storageService } from '@/services/storage/storageService'
import { supabase } from '@/services/supabase'
import { Alert } from 'react-native'

export async function removeExpense(id: string, month: string) {
  const storageGroup = storageService.getItem<groupStorageProps>('group')
  const previousData = storageGroup?.groupExpenses
  if (previousData) {
    const updatedExpensesForMonth = previousData[month].filter(
      (item: ExpensesProps) => item.id !== id,
    )

    // Atualiza o objeto com as despesas, mantendo os outros meses e apenas alterando o mês atual
    const updatedData = {
      ...previousData, // Mantém as despesas dos outros meses
      [month]: updatedExpensesForMonth, // Atualiza apenas o mês atual
    }
    const groupId = storageGroup?.groupId
    const { error } = await supabase
      .from('groups')
      .update({
        expenses: updatedData,
      })
      .eq('id', groupId)
    if (error) {
      Alert.alert('Indisponível no momento!')
      return null
    }
    const updatedGroup = { ...storageGroup, groupExpenses: updatedData }
    storageService.setItem('group', updatedGroup)
    return updatedExpensesForMonth
  } else {
    Alert.alert('Indisponível no momento!')
    return null
  }
}
