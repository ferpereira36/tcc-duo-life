import { useState } from 'react'
import { View, TextInput, Alert } from 'react-native'
import { ButtonProfileConfig } from '@/components/app/ui/ButtonProfileConfig'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import { ModalCard } from '@/components/app/ui/ModalCard'
import { supabase } from '@/services/supabase'

export function ChangePassword() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState('')

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
    <ButtonProfileConfig
      handleOpenModal={() => setModalVisible(true)}
      icon="key"
      title={'Alterar\nSenha'}
    >
      <ModalCard
        title="Digite uma nova senha"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        handleCloseModal={() => setModalVisible(false)}
      >
        <View className="mt-16">
          <TextInput
            className="text-grayApp mb-12 w-full h-14 px-2 border-2 border-graniteGray rounded-md"
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <ButtonViolet text="Salvar" onPress={handleSave} />
        </View>
      </ModalCard>
    </ButtonProfileConfig>
  )
}
