import { StyleSheet, Text, Alert, View, FlatList } from 'react-native'
import { Card } from '@/components/app/ui/Card'
import { ExpensesProps } from '@/types/ExpensesProps'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { nameMonth } from '@/utils/month/nameMonth'
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import ButtonSelectMonth from '@/components/app/ui/ButtonSelectMonth'
import { removeExpense } from '@/utils/card/removeExpense'

const ListExpenses = () => {
  const [data, setData] = useState<ExpensesProps[]>([])
  const [month, setMonth] = useState(nameMonth[new Date().getMonth()])

  async function handleRemove(id: string) {
    try {
      const expense = await removeExpense(id, month)
      if (expense) {
        setData(expense)
      }
    } catch (error) {
      Alert.alert('')
    }
  }

  const handleConfirmRemove = (id: string) => {
    Alert.alert(
      'Confirmação',
      'Você tem certeza que deseja realizar esta ação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => handleRemove(id),
        },
      ],
    )
  }

  useFocusEffect(
    useCallback(() => {
      const storageGroup = storageService.getItem<groupStorageProps>('group')
      async function handleFetchData() {
        const dataExpenses = storageGroup?.groupExpenses
        try {
          if (dataExpenses) {
            setData(dataExpenses[month])
          } else setData([])
        } catch (error) {
          setData([])
        }
      }

      handleFetchData()
    }, [month]),
  )

  return (
    <>
      <View className="w-full mb-6 p-0">
        <ButtonSelectMonth
          onMonthSelect={(monthSelect) => setMonth(monthSelect)}
          style={{ alignSelf: 'flex-end' }}
        />
      </View>
      {!data || Object.keys(data).length === 0 ? (
        <Text className="text-grayApp text-xl text-center w-full font-GroteskRegular">
          Nenhuma despesa encontrada
        </Text>
      ) : (
        <FlatList
          data={data.reverse()}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            return (
              <Card
                data={item}
                onPressRemove={() => handleConfirmRemove(item.id)}
              />
            )
          }}
        />
      )}
    </>
  )
}

export default ListExpenses

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingBottom: 150,
  },
})
