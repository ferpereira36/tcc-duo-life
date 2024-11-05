import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'

import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import DismissKeyboard from '@/components/app/DismissKeyboard'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import { supabase } from '@/services/supabase'
import { useState } from 'react'
import { router } from 'expo-router'
import { getUserId } from '@/services/supabase/group'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')

  async function signUpUser() {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: name, last_name: lastname } },
    })

    if (error) {
      console.error('Error signing in:', error.message)
      Alert.alert('Erro: Tente novamente mais tarde!')
      return
    }
    if (!session) {
      const userId = await getUserId()
      const { error: errorProfile } = await supabase
        .from('profiles')
        .update({ first_name: name, last_name: lastname })
        .eq('id', userId)

      if (errorProfile) {
        Alert.alert('Tente novamente!')
      } else {
        Alert.alert('Por favor, confirme seu cadastro no email!')
        router.replace('/loginScreen')
      }
    }
  }

  return (
    <SafeAreaIOS>
      <DismissKeyboard>
        <View className="h-full items-center justify-center w-full">
          <Text className="text-grayApp text-2xl mb-12">Criar conta</Text>
          <View className="gap-4 w-4/5 items-center">
            <TextInput
              className="w-full h-14 px-2 border-graniteGray border-2 rounded-md text-grayApp"
              placeholder="Nome"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              className="w-full h-14 px-2 border-graniteGray border-2 rounded-md text-grayApp"
              placeholder="Sobrenome"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
              value={lastname}
              onChangeText={(text) => setLastName(text)}
            />
            <TextInput
              className="w-full h-14 px-2 border-graniteGray border-2 rounded-md text-grayApp"
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
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View className="w-full">
              <TouchableOpacity onPress={() => router.navigate('/loginScreen')}>
                <Text className="text-graniteGray text-right">Fazer login</Text>
              </TouchableOpacity>
            </View>
            <ButtonViolet text="Cadastrar" onPress={signUpUser} />
          </View>
        </View>
      </DismissKeyboard>
    </SafeAreaIOS>
  )
}
