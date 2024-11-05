import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useFocusEffect } from 'expo-router'
import { calcPercentage } from '@/utils/calc/percentage'
import { totalSalaries } from '@/utils/calc/totalSalaries'
import { totalExpenses } from '@/utils/calc/totalExpenses'

type Props = {
  month: string
}

const ProgressBar = ({ month }: Props) => {
  const [percentual, setPercentual] = useState<number>(0)

  useFocusEffect(() => {
    try {
      const salaryGroup = totalSalaries()
      const groupExpensesValue = totalExpenses(month)
      setPercentual(calcPercentage(groupExpensesValue, salaryGroup))
    } catch (error) {
      setPercentual(0)
    }
  })

  return (
    <View className="bg-Eerie h-28 p-2 justify-center items-center rounded-lg">
      <View className="w-full flex-row justify-between absolute top-4">
        <Text className="h-8 text-white font-GroteskRegular text-lg">
          Total despesas x Total salários
        </Text>
        <Text className="font-GroteskRegular text-grayApp">{month}</Text>
      </View>
      <View className="h-5 w-full bg-graniteGray rounded-full overflow-hidden mt-8">
        <View
          className="h-full bg-violetApp"
          style={{ width: `${percentual}%` }}
        />
        <Text className="absolute w-full text-center font-GroteskRegular text-white">
          {percentual.toFixed(1)}%
        </Text>
      </View>
    </View>
  )
}

export default ProgressBar
