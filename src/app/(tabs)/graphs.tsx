import React from 'react'
import { Text, View } from 'react-native'
import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import RenderGraphs from '@/components/app/_Graphs/RenderGraphs'

export default function Graphs() {
  return (
    <SafeAreaIOS>
      <View className="p-5 pb-0">
        <Text className="font-GroteskBold text-2xl text-grayApp text-center mb-12">
          Gráficos
        </Text>
        <RenderGraphs />
      </View>
    </SafeAreaIOS>
  )
}
