import { Octicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function ButtonHelp() {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push('/helpScreen')}
    >
      <View className="items-center justify-center">
        <View className="bg-violetApp items-center h-20 w-20 rounded-full justify-center">
          <Octicons name={'question'} size={28} color="white" />
        </View>
        <Text className="text-grayApp text-center font-GroteskRegular mt-3">
          Ajuda
        </Text>
      </View>
    </TouchableOpacity>
  )
}
