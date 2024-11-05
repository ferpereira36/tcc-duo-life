import { Link } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

export default function IntroductionHelp() {
  return (
    <View className="">
      <Text className="text-grayApp text-justify text-lg">
        Aqui você encontrará respostas para perguntas comuns e orientações sobre
        como usar nosso aplicativo. Se você não encontrar o que está procurando,
        entre em contato conosco{' '}
        <Link href="/reportScreen" className="text-violet-600">
          clicando aqui!
        </Link>
      </Text>
    </View>
  )
}
