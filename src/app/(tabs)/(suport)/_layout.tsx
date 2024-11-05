import { Stack } from 'expo-router'
import { Platform } from 'react-native'
import { Colors } from '@/constants/Colors'
import React from 'react'

export default function SuportLayout() {
  return <SuportLayoutNav />
}

function SuportLayoutNav() {
  return (
    <Stack>
      <Stack.Screen
        name="helpScreen"
        options={{
          title: 'Ajuda',
          animation: 'fade',
          headerShown: false,
          statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
          statusBarColor:
            Platform.OS === 'android' ? `${Colors.chineseBlack}` : undefined,
        }}
      />
      <Stack.Screen
        name="reportScreen"
        options={{
          title: 'Reportar',
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
