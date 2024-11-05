import { useState } from 'react'
import { View, TextInput, Alert } from 'react-native'
import { ButtonProfileConfig } from '@/components/app/ui/ButtonProfileConfig'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import { ModalCard } from '@/components/app/ui/ModalCard'
import { supabase } from '@/services/supabase'
import { userStorageProps } from '@/types/storage/user'
import { storageService } from '@/services/storage/storageService'

export function ChangeName() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const storageUser = storageService.getItem<userStorageProps>('user')

  const handleSave = async () => {
    const data = name.toLowerCase()
    if (data !== '' && data !== 'admin' && data !== 'adm' && data.length >= 3) {
      const text = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase()
      const userId = storageUser?.id
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
        const updatedUser = { ...storageUser, name: text } as userStorageProps
        storageService.setItem<userStorageProps>('user', updatedUser)
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
    <ButtonProfileConfig
      handleOpenModal={() => setModalVisible(true)}
      icon="id-badge"
      title={'Alterar\nNome'}
    >
      <ModalCard
        title="Qual seu nome?"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        handleCloseModal={() => setModalVisible(false)}
      >
        <View className="mt-16">
          <TextInput
            className="text-grayApp mb-12 w-full h-14 px-2 border-2 border-graniteGray rounded-md"
            value={name}
            onChangeText={setName}
          />

          <ButtonViolet text="Salvar" onPress={handleSave} />
        </View>
      </ModalCard>
    </ButtonProfileConfig>
  )
}
