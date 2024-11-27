import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { Card } from '@/components/app/ui/Card'
import { ExpensesProps } from '@/types/ExpensesProps'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { router } from 'expo-router'
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { removeExpense } from '@/utils/card/removeExpense'

export const LimitedCards = ({ month }: { month: string }) => {
  const [limitedData, setLimitedData] = useState<ExpensesProps[]>([])

  async function handleRemove(id: string) {
    try {
      const expense = await removeExpense(id, month)
      if (expense) {
        setLimitedData(expense)
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
            const dataReverse = dataExpenses[month].reverse()
            setLimitedData(dataReverse.slice(0, 3))
          } else setLimitedData([])
        } catch (error) {
          setLimitedData([])
        }
      }

      handleFetchData()
    }, [month]),
  )

  return (
    <View className="bg-outerSpace p-5 pb-0 rounded-t-[28px]">
      <View className="flex-row justify-between">
        <Text className="font-GroteskBold text-lg text-grayApp mb-6">
          Despesas recentes
        </Text>
        <TouchableOpacity onPress={() => router.navigate('/expenses')}>
          <Text className="underline text-poppins text-darkGray">ver mais</Text>
        </TouchableOpacity>
      </View>
      {limitedData.length === 0 ? (
        <Text className="text-grayApp text-xl h-full text-center w-full font-GroteskRegular">
          Nenhuma despesa encontrada
        </Text>
      ) : (
        <View className="h-full">
          <FlatList
            data={limitedData}
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
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  listContent: {
    paddingBottom: 150,
  },
})
