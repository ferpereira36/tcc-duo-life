import { Octicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

type Props = {
  routeName: string
}

export default function ButtonBack({ routeName }: Props) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/${routeName}`)}
      style={{
        zIndex: 1,
      }}
    >
      <View className="absolute bg-violetApp w-14 h-12 items-center justify-center rounded-md">
        <Octicons name="arrow-left" size={24} color={'white'} />
      </View>
    </TouchableOpacity>
  )
}
