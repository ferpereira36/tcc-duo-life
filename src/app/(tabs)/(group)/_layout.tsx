import { Stack } from 'expo-router'
import { Platform } from 'react-native'
import { Colors } from '@/constants/Colors'
import React from 'react'

export default function GroupLayout() {
  return <GroupLayoutNav />
}

function GroupLayoutNav() {
  return (
    <Stack>
      <Stack.Screen
        name="infoGroup"
        options={{
          title: 'Informações do Grupo',
          animation: 'fade',
          headerShown: false,
          statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
          statusBarColor:
            Platform.OS === 'android' ? `${Colors.chineseBlack}` : undefined,
        }}
      />
    </Stack>
  )
}
