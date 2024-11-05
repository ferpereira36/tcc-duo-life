import { Colors } from '@/constants/Colors'
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { expensesWithId } from '@/utils/calc/expensesWithId'
import { View, Text } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import { totalExpenses } from '@/utils/calc/totalExpenses'
import { useFocusEffect } from 'expo-router'
import { useState } from 'react'

type Props = {
  month: string
}

export const DonutGraph = ({ month }: Props) => {
  const storageGroup = storageService.getItem<groupStorageProps>('group')
  const [percentage1, setPercentage1] = useState<number>(0)
  const [percentage2, setPercentage2] = useState<number>(0)
  const pieData = [
    {
      value: percentage1,
      color: `${Colors.violetApp}`,
      text: `${percentage1.toString()}%`,
    },
    {
      value: percentage2,
      color: `${Colors.taupeGray}`,
      text: `${percentage2.toString()}%`,
    },
  ]

  useFocusEffect(() => {
    const storageGroup = storageService.getItem<groupStorageProps>('group')
    const idOne = storageGroup?.groupMemberOneId || '0'
    const idTwo = storageGroup?.groupMemberTwoId || '0'
    if (storageGroup?.groupExpenses) {
      const expensesMemberOne = expensesWithId(idOne, month)
      const expensesMemberTwo = expensesWithId(idTwo, month)
      const total = totalExpenses(month)

      if (expensesMemberOne >= 0 && expensesMemberTwo >= 0) {
        const value1 = parseFloat(
          ((expensesMemberOne / total) * 100).toFixed(0),
        )
        const value2 = parseFloat(
          ((expensesMemberTwo / total) * 100).toFixed(0),
        )
        if (!Number.isNaN(value1) && !Number.isNaN(value2)) {
          setPercentage1(value1)
          setPercentage2(value2)
        } else {
          setPercentage1(0)
          setPercentage2(0)
        }
      }
    }
  })

  return (
    <View className="w-full bg-Eerie mt-6 rounded-lg py-4 px-2">
      <View className="w-full justify-between flex-row">
        <Text className="h-8 text-white font-GroteskRegular text-lg">
          Total despesas x Membros
        </Text>
        <Text className="text-grayApp font-GroteskRegular">{month}</Text>
      </View>
      <View className="mt-3 w-full">
        <View className="flex-row justify-evenly">
          {percentage1 !== 0 && (
            <View className="flex-row items-center gap-1">
              <View className="bg-violetApp color-white h-4 w-8" />
              <Text className="color-white font-GroteskRegular">
                {storageGroup?.groupMemberOneName}
              </Text>
            </View>
          )}
          {percentage2 !== 0 && (
            <View className="flex-row items-center gap-1">
              <View className="bg-taupeGray color-white h-4 w-8" />
              <Text className="color-white font-GroteskRegular">
                {storageGroup?.groupMemberTwoName}
              </Text>
            </View>
          )}
        </View>
        <View className="items-center mt-6">
          {percentage1 !== 0 || percentage2 !== 0 ? (
            <PieChart
              isAnimated
              donut
              showText
              textColor="white"
              innerRadius={80}
              innerCircleColor={Colors.Eerie}
              radius={140}
              textSize={16}
              data={pieData}
            />
          ) : (
            <Text className="font-GroteskRegular text-grayApp text-lg">
              Não existe dados neste mês!
            </Text>
          )}
        </View>
      </View>
    </View>
  )
}
