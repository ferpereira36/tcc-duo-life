import { Octicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function ButtonReport() {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push('/reportScreen')}
    >
      <View className="items-center justify-center">
        <View className="bg-violetApp items-center h-20 w-20 rounded-full justify-center">
          <Octicons name={'bug'} size={28} color="white" />
        </View>
        <Text className="text-grayApp text-center font-GroteskRegular mt-3">
          Reportar
        </Text>
      </View>
    </TouchableOpacity>
  )
}
