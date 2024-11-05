import { ButtonProfileConfig } from '@/components/app/ui/ButtonProfileConfig'
import { ModalCard } from '@/components/app/ui/ModalCard'
import { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { supabase } from '@/services/supabase'

export function MethodCalcGroup() {
  const [modalVisible, setModalVisible] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [clicked2, setClicked2] = useState(false)
  const [option, setOption] = useState('')
  const storageGroup = storageService.getItem<groupStorageProps>('group')

  const handleSave = async () => {
    const groupId = storageGroup?.groupId
    const { error } = await supabase
      .from('groups')
      .update({ account_division: option })
      .eq('id', groupId)

    if (error) {
      Alert.alert('Não foi possível alterar nesse momento!')
      setModalVisible(false)
      setClicked(false)
      setClicked2(false)
      setOption('')
    } else {
      Alert.alert('Modo alterado!')
      const updatedGroup = { ...storageGroup, groupAccountDivision: option }
      storageService.setItem('group', updatedGroup)
      setModalVisible(false)
      setClicked(false)
      setClicked2(false)
      setOption('')
    }
  }

  const selectedOption = (text: string) => {
    setOption(text)
  }

  return (
    <ButtonProfileConfig
      handleOpenModal={() => setModalVisible(true)}
      icon="diff"
      title={'Divisão\nde Contas'}
    >
      <ModalCard
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        handleCloseModal={() => setModalVisible(false)}
      >
        <View>
          <Text className="text-grayApp text-center text-xl font-GroteskRegular">
            Atual
          </Text>
          <Text className="text-white text-center text-2xl font-GroteskBold">
            {storageGroup?.groupAccountDivision === 'equal'
              ? 'Igualitário'
              : storageGroup?.groupAccountDivision === 'proportional'
                ? 'Proporcional'
                : ''}
          </Text>
          <View className="flex-row justify-between mt-12">
            <TouchableOpacity
              onPress={() => {
                selectedOption('equal')
                setClicked(true)
                setClicked2(false)
              }}
            >
              <View
                className={`border-2 w-48 items-center h-16 justify-center border-grayApp rounded-md ${clicked ? 'bg-violetApp' : 'bg-transparent'}`}
              >
                <Text className="text-white font-GroteskRegular">
                  Igualitário
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectedOption('proportional')
                setClicked(false)
                setClicked2(true)
              }}
            >
              <View
                className={`border-2 w-48 items-center h-16 justify-center border-grayApp rounded-md ${clicked2 ? 'bg-violetApp' : 'bg-transparent'}`}
              >
                <Text className="text-white font-GroteskRegular">
                  Proporcional
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ButtonViolet text="Salvar" onPress={handleSave} />
        </View>
      </ModalCard>
    </ButtonProfileConfig>
  )
}
