import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { useState } from 'react'
import { View, TextInput, Text, Alert } from 'react-native'
import { ButtonProfileConfig } from '@/components/app/ui/ButtonProfileConfig'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import { ModalCard } from '@/components/app/ui/ModalCard'
import { supabase } from '@/services/supabase'
import { stringToNumber } from '@/utils/format/stringToNumber'

export function ChangeGroupSalaries() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [salaryOne, setSalaryOne] = useState<string>('')
  const [salaryTwo, setSalaryTwo] = useState<string>('')
  const storageGroup = storageService.getItem<groupStorageProps>('group')

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
    <ButtonProfileConfig
      handleOpenModal={() => setModalVisible(true)}
      icon="database"
      title={'Alterar\nSalários'}
    >
      <ModalCard
        title="Qual o salario de cada membro?"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        handleCloseModal={() => setModalVisible(false)}
      >
        <View className="mt-16">
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

          <ButtonViolet text="Salvar" onPress={handleSave} />
        </View>
      </ModalCard>
    </ButtonProfileConfig>
  )
}
