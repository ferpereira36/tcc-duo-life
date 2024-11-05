import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'
import '../../global.css'

import { useColorScheme } from '@/components/useColorScheme'
import { Platform, View, Text, Alert } from 'react-native'
import { Colors } from '@/constants/Colors'
import React from 'react'
import { AuthProvider } from '@/app/context/auth'

export {
  // Capturando erros na inicialização do expo router
  ErrorBoundary,
} from 'expo-router'

export const unstableSettings = {
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    GroteskRegular: require('../assets/fonts/SpaceGrotesk-Regular.ttf'),
    GroteskBold: require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
  })

  if (error) {
    Alert.alert('Lamentamos, mas no momento estamos com instabilidade.')
  }

  if (!loaded && !error) {
    SplashScreen.hideAsync()
    return (
      <View className="justify-center items-center bg-black w-full h-full">
        <Text className="text-white">Carregando...</Text>
      </View>
    )
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
            statusBarColor:
              Platform.OS === 'android' ? `${Colors.chineseBlack}` : undefined,
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
            headerShown: false,
            statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
            statusBarColor:
              Platform.OS === 'android' ? `${Colors.chineseBlack}` : undefined,
          }}
        />
        <Stack.Screen
          name="loginScreen"
          options={{
            headerShown: false,
            statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
            statusBarColor:
              Platform.OS === 'android' ? `${Colors.chineseBlack}` : undefined,
          }}
        />
        <Stack.Screen
          name="registerScreen"
          options={{
            headerShown: false,
            statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
            statusBarColor:
              Platform.OS === 'android' ? `${Colors.chineseBlack}` : undefined,
          }}
        />
        <Stack.Screen
          name="createGroup"
          options={{
            headerShown: false,
            statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
            statusBarColor:
              Platform.OS === 'android' ? `${Colors.chineseBlack}` : undefined,
          }}
        />
        <Stack.Screen
          name="joinGroup"
          options={{
            headerShown: false,
            statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
            statusBarColor:
              Platform.OS === 'android' ? `${Colors.chineseBlack}` : undefined,
          }}
        />
        <Stack.Screen
          name="unlockScreen"
          options={{
            headerShown: false,
            statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
            statusBarColor:
              Platform.OS === 'android' ? `${Colors.chineseBlack}` : undefined,
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}
