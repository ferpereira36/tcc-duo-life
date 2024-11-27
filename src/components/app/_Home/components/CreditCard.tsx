import { Colors } from '@/constants/Colors'
import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from 'expo-router'
import { ExpensesProps } from '@/types/ExpensesProps'
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { numberToBRL } from '@/utils/format/numberToBRL'

export const CreditCard = ({ month }: { month: string }) => {
  const [groupName, setGroupName] = useState('')
  const [groupExpensesValue, setGroupExpensesValue] = useState('')

  const cardInfo = {
    number: '**** **** **** **** ' + new Date().getFullYear(),
  }

  useFocusEffect(
    useCallback(() => {
      const storageGroup = storageService.getItem<groupStorageProps>('group')
      async function CreditData() {
        const name = storageGroup?.groupName
        if (name) {
          setGroupName(name)
        } else {
          setGroupName('')
        }

        const currentExpenses = storageGroup?.groupExpenses

        if (currentExpenses) {
          if (currentExpenses[month]) {
            // Usa reduce para somar os valores
            const total = currentExpenses[month]
              .map((item: ExpensesProps) =>
                Number(item.value.replace(/\./g, '').replace(',', '.')),
              ) // Converte o valor de string para número
              .reduce((acc: number, value: number) => acc + value, 0) // Soma todos os valores

            // Formatando o total como moeda BRL
            const valueBRL = numberToBRL(total)

            setGroupExpensesValue(valueBRL)
          } else {
            setGroupExpensesValue('0,00')
          }
        } else {
          setGroupExpensesValue('0,00')
        }
      }
      CreditData()
    }, [month]),
  )

  return (
    <View className="relative items-center mt-20 ">
      <View className="absolute transform -rotate-12 right-5 bottom-8">
        <LinearGradient
          style={styles.gradientTwo}
          colors={[
            'rgba(34, 34, 34, 0.4)',
            'rgba(136, 136, 136, 0.4)',
            'rgba(34, 34, 34, 0.4)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.5, 1]}
        />
      </View>
      <View className="right-7">
        <LinearGradient
          style={styles.gradientCard}
          colors={[
            `${Colors.Raisin}`,
            `${Colors.graniteGray}`,
            `${Colors.Raisin}`,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.5, 1]}
        />
        <Text className="absolute font-GroteskRegular top-6 left-6 text-white text-2xl">
          {groupName}
        </Text>
        <Text className="absolute top-1/2 left-6 font-GroteskRegular text-white">
          {cardInfo.number}
        </Text>
        <View className="absolute left-6 bottom-6">
          <Text className="text-white text-xs font-GroteskRegular">
            Despesas do mês:
          </Text>
          <Text className=" text-white text-xl font-GroteskBold">
            {groupExpensesValue}
          </Text>
        </View>
        <Text className="bottom-6 right-6 absolute text-white font-GroteskRegular">
          {month}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  gradientCard: {
    width: 316,
    height: 214,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: `${Colors.graniteGray}`,
  },
  gradientTwo: {
    width: 316,
    height: 214,
    borderRadius: 20,
  },
})
