import ButtonBack from '@/components/app/ui/ButtonBack'
import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import React from 'react'
import { View, Text } from 'react-native'
import { IntroductionReport } from '@/components/app/_SuportScreen/_Report/introduction'
import { Contact } from '@/components/app/_SuportScreen/_Report/contact'

export default function ReportScreen() {
  return (
    <SafeAreaIOS>
      <View className="flex-1 bg-chineseBlack p-5 pb-0">
        <View className="relative">
          <ButtonBack routeName="profile" />
        </View>
        <Text className="font-GroteskBold mb-12 mt-2 text-center text-2xl text-grayApp">
          Reportar
        </Text>
        <IntroductionReport />
        <Contact />
      </View>
    </SafeAreaIOS>
  )
}
