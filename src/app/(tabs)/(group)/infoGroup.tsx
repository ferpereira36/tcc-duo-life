import InfoGroup from '@/components/app/_GroupScreen/info'
import ButtonBack from '@/components/app/ui/ButtonBack'
import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import React from 'react'
import { View, Text } from 'react-native'

export default function GroupScreen() {
  return (
    <SafeAreaIOS>
      <View className="flex-1 bg-chineseBlack p-5 pb-0">
        <View className="relative">
          <ButtonBack routeName="profile" />
        </View>
        <Text className="font-GroteskBold mb-12 mt-2 text-center text-2xl text-grayApp">
          Informações do Grupo
        </Text>
        <InfoGroup />
      </View>
    </SafeAreaIOS>
  )
}
