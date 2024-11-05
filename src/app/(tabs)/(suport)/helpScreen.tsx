import IntroductionHelp from '@/components/app/_SuportScreen/_Help/introduction'
import TutorialHelp from '@/components/app/_SuportScreen/_Help/tutorialHelp'
import ButtonBack from '@/components/app/ui/ButtonBack'
import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import React from 'react'
import { View, Text } from 'react-native'

export default function HelpScreen() {
  return (
    <SafeAreaIOS>
      <View className="flex-1 bg-chineseBlack p-5 pb-0">
        <View className="relative">
          <ButtonBack routeName="profile" />
        </View>
        <Text className="font-GroteskBold mb-12 mt-2 text-center text-2xl text-grayApp">
          Ajuda
        </Text>
        <IntroductionHelp />
        <TutorialHelp />
      </View>
    </SafeAreaIOS>
  )
}
