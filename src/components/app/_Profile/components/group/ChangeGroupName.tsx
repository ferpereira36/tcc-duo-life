import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { useState } from 'react'
import { View, TextInput, Alert } from 'react-native'
import { ButtonProfileConfig } from '@/components/app/ui/ButtonProfileConfig'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import { ModalCard } from '@/components/app/ui/ModalCard'
import { supabase } from '@/services/supabase'

export function ChangeGroupName() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [nameGroup, setNameGroup] = useState<string>('')
  const storageGroup = storageService.getItem<groupStorageProps>('group')

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
    <ButtonProfileConfig
      handleOpenModal={() => setModalVisible(true)}
      icon="people"
      title={'Alterar\nNome'}
    >
      <ModalCard
        title="Qual o nome do grupo?"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        handleCloseModal={() => setModalVisible(false)}
      >
        <View className="mt-16">
          <TextInput
            className="text-grayApp mb-12 w-full h-14 px-2 border-2 border-graniteGray rounded-md"
            value={nameGroup}
            onChangeText={setNameGroup}
          />

          <ButtonViolet text="Salvar" onPress={handleSave} />
        </View>
      </ModalCard>
    </ButtonProfileConfig>
  )
}
