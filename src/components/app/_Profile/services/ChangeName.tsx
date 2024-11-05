import { Octicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native'
import { supabase } from '@/services/supabase'
import { storage } from '@/services/storage/mmkvStorage'
import { userStorageProps } from '@/types/storage/user'

const ChangeName = () => {
  const dataUser = storage.getString('user')
  const storageUser: userStorageProps = dataUser ? JSON.parse(dataUser) : {}
  const [modalVisible, setModalVisible] = useState(false)
  const [name, setName] = useState('')
  const user = storageUser

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleSave = async () => {
    const data = name.toLowerCase()
    if (data !== '' && data !== 'admin' && data !== 'adm' && data.length >= 3) {
      const text = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase()
      const userId = storageUser.id
      const { error } = await supabase
        .from('profiles')
        .update({ first_name: text })
        .eq('id', userId)

      if (error) {
        Alert.alert('Não foi possível alterar nesse momento!')
        setModalVisible(false)
        setName('')
      } else {
        Alert.alert('Nome alterado!')
        user.name = text
        storage.set('user', JSON.stringify(user))
        setModalVisible(false)
        setName('')
      }
    } else {
      Alert.alert('Nome inválido!')
      setModalVisible(false)
      setName('')
    }
  }

  return (
    <View className="">
      <TouchableOpacity activeOpacity={0.5} onPress={handleOpenModal}>
        <View className="items-center justify-center">
          <View className="bg-violetApp items-center h-20 w-20 rounded-full justify-center">
            <Octicons name={'id-badge'} size={28} color="white" />
          </View>
          <Text className="text-grayApp text-center font-GroteskRegular mt-3">
            Alterar{'\n'}
            Nome
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 items-center justify-center">
          <View className="bg-Eerie p-5 w-96 rounded-lg border-2 border-grayApp justify-center items-center">
            <Text className="text-white text-xl font-GroteskBold mb-4">
              Qual seu nome?
            </Text>

            <TextInput
              className="text-grayApp w-full h-14 px-2 border-2 border-graniteGray rounded-md"
              value={name}
              onChangeText={setName}
            />

            <View className="flex-row justify-evenly w-full items-center">
              <TouchableOpacity onPress={handleSave}>
                <Text className="text-grayApp mt-10 font-GroteskBold text-xl">
                  Salvar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCloseModal}>
                <Text className="text-grayApp mt-10 font-GroteskBold text-xl">
                  Fechar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ChangeName
