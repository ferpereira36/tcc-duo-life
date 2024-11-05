import { useState } from 'react'
import { View, TextInput, Alert } from 'react-native'
import { ButtonProfileConfig } from '@/components/app/ui/ButtonProfileConfig'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import { ModalCard } from '@/components/app/ui/ModalCard'
import { supabase } from '@/services/supabase'
import { userStorageProps } from '@/types/storage/user'
import { storageService } from '@/services/storage/storageService'

export function ChangeLastName() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [lastName, setLastName] = useState<string>('')
  const storageUser = storageService.getItem<userStorageProps>('user')

  const handleSave = async () => {
    const data = lastName.toLowerCase()
    if (data !== '' && data !== 'admin' && data !== 'adm' && data.length >= 3) {
      const text = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase()
      const userId = storageUser?.id
      const { error } = await supabase
        .from('profiles')
        .update({ last_name: text })
        .eq('id', userId)

      if (error) {
        Alert.alert('Não foi possível alterar nesse momento!')
        setModalVisible(false)
        setLastName('')
      } else {
        Alert.alert('Sobrenome alterado!')
        const updatedUser = {
          ...storageUser,
          lastName: text,
        } as userStorageProps
        storageService.setItem<userStorageProps>('user', updatedUser)
        setModalVisible(false)
        setLastName('')
      }
    } else {
      Alert.alert('Sobrenome inválido!')
      setModalVisible(false)
      setLastName('')
    }
  }

  return (
    <ButtonProfileConfig
      handleOpenModal={() => setModalVisible(true)}
      icon="note"
      title={'Alterar\nSobrenome'}
    >
      <ModalCard
        title="Qual seu sobrenome?"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        handleCloseModal={() => setModalVisible(false)}
      >
        <View className="mt-16">
          <TextInput
            className="text-grayApp mb-12 w-full h-14 px-2 border-2 border-graniteGray rounded-md"
            value={lastName}
            onChangeText={setLastName}
          />

          <ButtonViolet text="Salvar" onPress={handleSave} />
        </View>
      </ModalCard>
    </ButtonProfileConfig>
  )
}
