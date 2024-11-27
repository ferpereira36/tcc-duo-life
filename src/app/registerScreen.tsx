import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'

import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import DismissKeyboard from '@/components/app/DismissKeyboard'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import { supabase } from '@/services/supabase'
import { useState } from 'react'
import { router } from 'expo-router'
import { getUserId } from '@/services/supabase/group'
import { ButtonRegisterGender } from '@/components/app/ui/ButtonRegisterGender'
import { ModalCard } from '@/components/app/ui/ModalCard'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [selectedGender, setSelectedGender] = useState('')

  const [modalVisible, setModalVisible] = useState(false)

  async function signUpUser() {
    if (
      selectedGender !== '' &&
      email !== '' &&
      name !== '' &&
      name !== 'admin' &&
      name !== 'adm' &&
      lastname !== '' &&
      lastname !== 'admin' &&
      lastname !== 'adm' &&
      password !== ''
    ) {
      let gender: string
      if (selectedGender === 'masculino') {
        gender = 'male'
      } else {
        gender = 'female'
      }
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: name, last_name: lastname, sex_gender: gender },
        },
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
          .update({ first_name: name, last_name: lastname, sex_gender: gender })
          .eq('id', userId)

        if (errorProfile) {
          Alert.alert('Tente novamente!')
        } else {
          Alert.alert('Por favor, confirme seu cadastro no email!')
          router.replace('/loginScreen')
        }
      }
    } else {
      return null
    }
  }

  return (
    <SafeAreaIOS>
      <DismissKeyboard>
        <View className="h-full items-center justify-center w-full">
          <Text className="text-grayApp text-2xl mb-12">Criar uma conta</Text>
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

            <ButtonRegisterGender
              handleOpenModal={() => setModalVisible(true)}
              selectedGender={selectedGender}
            >
              <ModalCard
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                handleCloseModal={() => setModalVisible(false)}
              >
                <View className="p-5">
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false)
                      setSelectedGender('Masculino')
                    }}
                    style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}
                  >
                    <View className="items-center my-6">
                      <Text className="text-grayApp text-xl">Masculino</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false)
                      setSelectedGender('Feminino')
                    }}
                    style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}
                  >
                    <View className="items-center my-6">
                      <Text className="text-grayApp text-xl">Feminino</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ModalCard>
            </ButtonRegisterGender>

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
                <Text className="text-grayApp text-right">Fazer login</Text>
              </TouchableOpacity>
            </View>
            <ButtonViolet text="Cadastrar" onPress={signUpUser} />
          </View>
        </View>
      </DismissKeyboard>
    </SafeAreaIOS>
  )
}
