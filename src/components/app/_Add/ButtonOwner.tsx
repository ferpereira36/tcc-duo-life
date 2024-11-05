import { Octicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import React, { useCallback, useState } from 'react'
import { View, Modal, TouchableOpacity, Text, ScrollView } from 'react-native'
import OwnerButton from './ui/OwnerButton'
import { useFocusEffect } from 'expo-router'
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'

type Props = {
  selectedOwner: (idButton: number, member: string | undefined) => void
  title: string
  icon: keyof typeof Octicons.glyphMap
  text: string
}

const ButtonOwner = ({ selectedOwner, title, icon, text }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [memberOne, setMemberOne] = useState<string | undefined>('')
  const [memberTwo, setMemberTwo] = useState<string | undefined>('')

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  useFocusEffect(
    useCallback(() => {
      const storageGroup = storageService.getItem<groupStorageProps>('group')
      async function getNames() {
        const memberOne = storageGroup?.groupMemberOneName
        const memberTwo = storageGroup?.groupMemberTwoName
        setMemberOne(memberOne)
        setMemberTwo(memberTwo)
      }
      getNames()
    }, []),
  )

  return (
    <View className="flex-row p-5 bg-Eerie rounded-lg items-center shadow-lg shadow-outerSpace">
      <View className="bg-outerSpace h-16 w-16 rounded-full items-center justify-center">
        <Octicons name={icon} size={24} color={`${Colors.darkGray}`} />
      </View>
      <View className="flex-1 ml-3 gap-2">
        <Text className="color-darkGray font-GroteskBold text-lg">{title}</Text>
        <TouchableOpacity onPress={handleOpenModal}>
          <View className="h-14 border-2 rounded-md border-outerSpace p-3 color-darkGray justify-center">
            <Text className="text-darkGray">{text}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        animationType="fade"
      >
        <View className="absolute bottom-0 w-full">
          <View className="bg-Eerie p-5 w-full rounded-3xl justify-center items-center">
            <Text className="text-white text-xl font-GroteskBold mb-4">
              Escolha um responsável
            </Text>
            <View className="absolute top-5 right-5">
              <TouchableOpacity onPress={handleCloseModal}>
                <Octicons
                  name={'x-circle-fill'}
                  size={24}
                  color={`${Colors.darkGray}`}
                />
              </TouchableOpacity>
            </View>

            <View className="w-full h-96 mb-8">
              <ScrollView>
                <OwnerButton
                  owner={memberOne}
                  onSelectOwner={(idButton) =>
                    selectedOwner(idButton, memberOne)
                  }
                  setModalVisible={setModalVisible}
                  idButton={1}
                />
                <OwnerButton
                  owner={memberTwo}
                  onSelectOwner={(idButton) =>
                    selectedOwner(idButton, memberTwo)
                  }
                  setModalVisible={setModalVisible}
                  idButton={2}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ButtonOwner
