import { FontAwesome6 } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type Props = {
  icon: keyof typeof FontAwesome6.glyphMap
  color: string
  text: string
  onSelectMethod: (category: string) => void
  setModalVisible: (visible: boolean) => void
}

export function Method({
  icon,
  color,
  text,
  onSelectMethod,
  setModalVisible,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        onSelectMethod(text)
        setModalVisible(false)
      }}
      style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}
    >
      <View className="flex-row items-center my-6 ml-6">
        <FontAwesome6 name={icon} size={32} color={color} className="mr-4" />
        <Text className="text-grayApp text-xl">{text}</Text>
      </View>
    </TouchableOpacity>
  )
}
