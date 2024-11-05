import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useFocusEffect } from 'expo-router'
import { proporcionalSalaries } from '@/utils/calc/proporcionalSalaries'
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { equalSalaries } from '@/utils/calc/equalSalaries'

type Props = {
  month: string
}

export const GroupDivision = ({ month }: Props) => {
  const [accountDivisionGroup, setAccountDivisionGroup] = useState<
    string | undefined
  >('')
  const [nameOne, setNameOne] = useState<string | undefined>('')
  const [nameTwo, setNameTwo] = useState<string | undefined>('')
  const [salaryOne, setSalaryOne] = useState<string>('0,00')
  const [salaryTwo, setSalaryTwo] = useState<string>('0,00')

  useFocusEffect(() => {
    const storageGroup = storageService.getItem<groupStorageProps>('group')
    const accountDivision = storageGroup?.groupAccountDivision
    setAccountDivisionGroup(accountDivision)
    setNameOne(storageGroup?.groupMemberOneName)
    setNameTwo(storageGroup?.groupMemberTwoName)

    if (accountDivision === 'equal') {
      const result = equalSalaries(month)
      setSalaryOne(result.salaryOneEqual)
      setSalaryTwo(result.salaryTwoEqual)
    }
    if (accountDivision === 'proportional') {
      const result = proporcionalSalaries(month)
      setSalaryOne(result.salaryOnePercentual)
      setSalaryTwo(result.salaryTwoPercentual)
    }
  })

  return (
    <View className="bg-Eerie mt-6 p-2 rounded-lg mb-40">
      <View className="w-full flex-row justify-between items-center">
        <Text className="h-8 text-white font-GroteskRegular text-lg">
          Divisão de contas{' '}
          {accountDivisionGroup === 'equal'
            ? 'Igualitária'
            : accountDivisionGroup === 'proportional'
              ? 'Proporcional'
              : ''}
        </Text>
        <Text className="font-GroteskRegular text-grayApp">{month}</Text>
      </View>
      <View className="w-full flex-row justify-evenly mt-5 mb-2">
        {salaryOne !== '0,00' && (
          <View className="justify-center">
            <View className="flex-row items-center">
              <View className="bg-violetApp h-4 w-8" />
              <Text className="ml-2 font-GroteskRegular text-white">
                {nameOne}
              </Text>
            </View>
            <Text className="text-2xl text-white mt-2">{salaryOne}</Text>
          </View>
        )}
        {salaryTwo !== '0,00' && (
          <View className="justify-center">
            <View className="flex-row items-center">
              <View className="bg-taupeGray h-4 w-8" />
              <Text className="ml-2 font-GroteskRegular text-white">
                {nameTwo}
              </Text>
            </View>
            <Text className="text-2xl text-white mt-2">{salaryTwo}</Text>
          </View>
        )}
      </View>
    </View>
  )
}
