import { MaterialIcons, Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { ModalCard } from '@/components/app/ui/ModalCard'
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'

const InviteGroupButton = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const storageGroup = storageService.getItem<groupStorageProps>('group')

  const handleCopy = async () => {
    await Clipboard.setStringAsync(
      'Entre no meu grupo pelo ID: ' + storageGroup?.groupId,
    )
  }

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => setModalVisible(true)}
      >
        <View className="rounded-md w-16 h-16 bg-outerSpace items-center justify-center">
          <Feather name="user-plus" size={28} color={'yellow'} />
        </View>
      </TouchableOpacity>

      <ModalCard
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        handleCloseModal={() => setModalVisible(false)}
      >
        <View className="items-center">
          <Text className="text-white text-xl font-GroteskBold">
            Este é o ID do seu grupo
          </Text>

          <Text className="text-grayApp my-20 text-lg w-full px-1 flex-wrap rounded-md text-center">
            {storageGroup?.groupId}
          </Text>

          <TouchableOpacity onPress={handleCopy}>
            <View className="bg-violetApp rounded-md w-12 h-12 items-center justify-center">
              <MaterialIcons name="content-copy" size={20} color={'white'} />
            </View>
          </TouchableOpacity>
        </View>
      </ModalCard>
    </View>
  )
}

export default InviteGroupButton
