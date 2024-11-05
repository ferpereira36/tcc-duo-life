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
import { stringToNumber } from '@/utils/format/stringToNumber'

const ChangeSalaries = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [salaryOne, setSalaryOne] = useState('')
  const [salaryTwo, setSalaryTwo] = useState('')
  const storageGroup = storageService.getItem<groupStorageProps>('group')

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleSalaryOne = (text: string) => {
    const value = stringToNumber(text)
    setSalaryOne(value)
  }

  const handleSalaryTwo = (text: string) => {
    const value = stringToNumber(text)
    setSalaryTwo(value)
  }

  const handleSave = async () => {
    try {
      const newData = {
        salaryOne,
        salaryTwo,
      }

      const groupId = storageGroup?.groupId

      const { error } = await supabase
        .from('groups')
        .update({
          salaries: newData,
        })
        .eq('id', groupId)

      if (error) {
        Alert.alert('Não foi possível mudar os salários no momento!')
        setSalaryOne('')
        setSalaryTwo('')
        setModalVisible(false)
      } else {
        Alert.alert('Alterado com sucesso!')
        const updatedGroup = { ...storageGroup, groupSalaries: newData }
        storageService.setItem('group', updatedGroup)
        setSalaryOne('')
        setSalaryTwo('')
        setModalVisible(false)
      }
    } catch (error) {
      Alert.alert('Não foi possível atualizar!')
      setSalaryOne('')
      setSalaryTwo('')
      setModalVisible(false)
    }
  }

  return (
    <View className="">
      <TouchableOpacity activeOpacity={0.5} onPress={handleOpenModal}>
        <View className="items-center justify-center">
          <View className="bg-violetApp items-center h-20 w-20 rounded-full justify-center">
            <Octicons name={'database'} size={28} color="white" />
          </View>
          <Text className="text-grayApp text-center font-GroteskRegular mt-3">
            Alterar{'\n'}
            Salários
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
            <Text className="text-white text-xl font-GroteskBold mb-8">
              Qual o salario de cada membro?
            </Text>

            <View className="w-full">
              <Text className="text-white font-GroteskRegular">Salário 1:</Text>
              <TextInput
                className="text-grayApp w-full mt-1 h-14 px-2 border-2 border-graniteGray rounded-md"
                value={salaryOne}
                onChangeText={handleSalaryOne}
              />
            </View>
            <View className="w-full mt-8">
              <Text className="text-white font-GroteskRegular">Salário 2:</Text>
              <TextInput
                className="text-grayApp w-full mt-1 h-14 px-2 border-2 border-graniteGray rounded-md"
                value={salaryTwo}
                onChangeText={handleSalaryTwo}
              />
            </View>

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

export default ChangeSalaries
