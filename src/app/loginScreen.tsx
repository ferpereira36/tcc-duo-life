import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'

import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import DismissKeyboard from '@/components/app/DismissKeyboard'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import { useState } from 'react'
import { router } from 'expo-router'
import { authLogin } from '@/services/login'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signInUser() {
    const { sucess } = await authLogin(email, password)
    if (!sucess) {
      Alert.alert('Credenciais inválidas!')
    } else {
      console.log('Enviando para Unlock')
      router.navigate('/unlockScreen')
    }
  }

  return (
    <SafeAreaIOS>
      <DismissKeyboard>
        <View className="h-full items-center justify-center w-full">
          <Text className="text-grayApp text-2xl mb-12">
            Faça sua autenticação
          </Text>
          <View className="gap-4 w-4/5 items-center">
            <TextInput
              className="w-full h-14  px-2 border-graniteGray border-2 rounded-md text-grayApp"
              placeholder="Email"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              className="w-full h-14 px-2 border-graniteGray border-2 rounded-md text-grayApp"
              placeholder="Senha"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View className="w-full">
              <TouchableOpacity
                onPress={() => router.navigate('/registerScreen')}
              >
                <Text className="text-graniteGray text-right">
                  Criar uma conta
                </Text>
              </TouchableOpacity>
            </View>
            <ButtonViolet text="Entrar" onPress={() => signInUser()} />
          </View>
        </View>
      </DismissKeyboard>
    </SafeAreaIOS>
  )
}
