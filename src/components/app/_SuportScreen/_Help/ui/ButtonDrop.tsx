import { Octicons } from '@expo/vector-icons'
import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'

type Props = {
  title: string
  text: string
}

export default function RemoveExpensesHelp({ title, text }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const rotateAnim = useRef(new Animated.Value(0)).current

  const toggleOpen = () => {
    setIsOpen(!isOpen)

    // Animação de rotação
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  // Define a interpolação da rotação
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Rotação de 0 a 180 graus
  })

  return (
    <View className="mt-5">
      <TouchableOpacity onPress={toggleOpen}>
        <View className="bg-violetApp p-3 rounded-md flex-row items-center justify-between">
          <Text className="text-white text-lg font-GroteskBold">{title}</Text>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <Octicons name="chevron-down" size={24} color="#fff" />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View className="mt-5 p-2 rounded-md">
          <Text className="text-grayApp text-justify">{text}</Text>
        </View>
      )}
    </View>
  )
}
