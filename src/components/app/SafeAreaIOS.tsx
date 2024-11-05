import { Colors } from '@/constants/Colors'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  children: React.ReactNode
}

const SafeAreaIOS = ({ children }: Props) => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: Colors.chineseBlack,
        width: '100%',
        height: '100%',
      }}
    >
      <StatusBar style="light" />
      {children}
    </View>
  )
}

export default SafeAreaIOS
