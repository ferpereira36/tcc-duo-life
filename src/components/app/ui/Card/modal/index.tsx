import { Colors } from '@/constants/Colors'
import { Octicons } from '@expo/vector-icons'
import { ExpensesProps } from '@/types/ExpensesProps'
import { Modal, View, TouchableOpacity, Text } from 'react-native'
import { useFocusEffect } from 'expo-router'
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { useState } from 'react'

type Props = {
  data: ExpensesProps
  visible: boolean
  onClose: () => void
  onPressRemove: () => void
}

export default function CardModal({
  data,
  visible,
  onClose,
  onPressRemove,
}: Props) {
  const [owner, setOwner] = useState('')

  useFocusEffect(() => {
    const handleOwner = () => {
      const storageGroup = storageService.getItem<groupStorageProps>('group')
      if (data.owner_id === storageGroup?.groupMemberOneId) {
        setOwner(storageGroup?.groupMemberOneName)
      }
      if (data.owner_id === storageGroup?.groupMemberTwoId) {
        setOwner(storageGroup?.groupMemberTwoName)
      }
    }
    handleOwner()
  })

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="absolute bottom-0 w-full">
        <View className="bg-Eerie p-5 rounded-t-3xl pb-12">
          <Text className="text-white text-xl text-center font-GroteskBold mb-8">
            Detalhes da Despesa
          </Text>
          <View className="absolute top-5 right-5">
            <TouchableOpacity onPress={onClose}>
              <Octicons
                name={'x-circle-fill'}
                size={24}
                color={`${Colors.darkGray}`}
              />
            </TouchableOpacity>
          </View>
          <View className="gap-4 mb-6">
            <View className="flex-row">
              <Text className="text-white text-xl mr-2">Nome:</Text>
              <Text className="text-grayApp text-lg">{data.name}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-white text-xl mr-2">Categoria:</Text>
              <Text className="text-grayApp text-lg">{data.category}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-white text-xl mr-2">Data:</Text>
              <Text className="text-grayApp text-lg">{data.date}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-white text-xl mr-2">Valor:</Text>
              <Text className="text-grayApp text-lg">R$ {data.value}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-white text-xl mr-2">Responsável:</Text>
              <Text className="text-grayApp text-lg">{owner}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-white text-xl mr-2">
                Método de Pagamento:
              </Text>
              <Text className="text-grayApp text-lg">{data.method}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-white text-xl mr-2">Observação:</Text>
              <Text className="text-grayApp text-lg">{data.observation}</Text>
            </View>
          </View>
          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                onClose()
                onPressRemove()
              }}
            >
              <View className="bg-red-700 w-16 items-center h-16 justify-center rounded-xl">
                <Octicons name="trash" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
