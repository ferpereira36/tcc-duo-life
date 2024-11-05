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
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'

const ChangeGroupName = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [nameGroup, setNameGroup] = useState('')
  const storageGroup = storageService.getItem<groupStorageProps>('group')

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleSave = async () => {
    const data = nameGroup.toLowerCase()
    if (data !== '' && data.length >= 3) {
      const groupId = storageGroup?.groupId
      const { error } = await supabase
        .from('groups')
        .update({ name: nameGroup })
        .eq('id', groupId)

      if (error) {
        Alert.alert('Não foi possível alterar nesse momento!')
        setModalVisible(false)
        setNameGroup('')
      } else {
        Alert.alert('Nome alterado!')
        const updatedGroup = { ...storageGroup, groupName: nameGroup }
        storageService.setItem('group', updatedGroup)
        setModalVisible(false)
        setNameGroup('')
      }
    } else {
      Alert.alert('Nome inválido!')
      setModalVisible(false)
      setNameGroup('')
    }
  }

  return (
    <View className="">
      <TouchableOpacity activeOpacity={0.5} onPress={handleOpenModal}>
        <View className="items-center justify-center">
          <View className="bg-violetApp items-center h-20 w-20 rounded-full justify-center">
            <Octicons name={'people'} size={28} color="white" />
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
              Qual o nome do grupo?
            </Text>

            <TextInput
              className="text-grayApp w-full h-14 px-2 border-2 border-graniteGray rounded-md"
              value={nameGroup}
              onChangeText={setNameGroup}
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

export default ChangeGroupName
