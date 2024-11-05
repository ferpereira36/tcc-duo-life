import { useState } from 'react'
import { TextInput, View, Alert } from 'react-native'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'

export function Contact() {
  const [message, setMessage] = useState<string>('')

  const handleMessage = () => {
    Alert.alert('Enviado com sucesso!')
    setMessage('')
    router.navigate('/profile')
  }

  return (
    <View className="mt-8">
      <TextInput
        className="text-grayApp align-top mb-12 h-64 w-full px-2 border-2 border-outerSpace rounded-md"
        value={message}
        onChangeText={setMessage}
        placeholder="Escreva sua mensagem aqui..."
        placeholderTextColor={`${Colors.graniteGray}`}
        multiline={true}
        maxLength={1200}
      />
      <ButtonViolet text="Enviar" onPress={handleMessage} />
    </View>
  )
}
