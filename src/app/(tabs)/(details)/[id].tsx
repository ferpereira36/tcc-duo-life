import ButtonBack from '@/components/app/ui/ButtonBack'
import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

export default function DetailsExpense() {
  const { id } = useLocalSearchParams()

  return (
    <SafeAreaIOS>
      <View className="flex-1 bg-chineseBlack p-5 pb-0">
        <View className="relative">
          <ButtonBack routeName="expenses" />
        </View>
        <Text className="font-GroteskBold mb-12 mt-2 text-center text-2xl text-grayApp">
          Detalhes da despesa
        </Text>
        <View className="items-center justify-center">
          <Text className="text-white">Id da despesa: {id}</Text>
        </View>
      </View>
    </SafeAreaIOS>
  )
}
