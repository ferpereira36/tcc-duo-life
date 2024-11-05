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

const ChangePassword = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [newPassword, setNewPassword] = useState('')

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleSave = async () => {
    if (newPassword !== '' && newPassword.length >= 3) {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        Alert.alert('Não foi possível alterar nesse momento!')
        setModalVisible(false)
        setNewPassword('')
      } else {
        Alert.alert('Senha alterada!')
        setModalVisible(false)
        setNewPassword('')
      }
    } else {
      Alert.alert('Senha inválida!')
      setModalVisible(false)
      setNewPassword('')
    }
  }

  return (
    <View className="">
      <TouchableOpacity activeOpacity={0.5} onPress={handleOpenModal}>
        <View className="items-center justify-center">
          <View className="bg-violetApp items-center h-20 w-20 rounded-full justify-center">
            <Octicons name={'key'} size={28} color="white" />
          </View>
          <Text className="text-grayApp text-center font-GroteskRegular mt-3">
            Alterar{'\n'}
            Senha
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
              Qual sua nova senha?
            </Text>

            <TextInput
              className="text-grayApp w-full h-14 px-2 border-2 border-graniteGray rounded-md"
              value={newPassword}
              onChangeText={setNewPassword}
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

export default ChangePassword
