import { Link } from 'expo-router'
import { View, Text } from 'react-native'

export function IntroductionReport() {
  return (
    <View className="">
      <Text className="text-grayApp text-justify text-lg">
        Queremos te ouvir! Envie uma mensagem ao nosso suporte para relatar um
        problema ou enviar um feedback! Caso esteja perdido e precise de
        informações sobre como usar o Duo Life,{' '}
        <Link href="/helpScreen" className="text-violet-600">
          clique aqui!
        </Link>
      </Text>
    </View>
  )
}
