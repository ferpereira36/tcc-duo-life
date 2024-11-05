import { Colors } from '@/constants/Colors'
import { Octicons } from '@expo/vector-icons'
import { Modal, Text, View, TouchableOpacity } from 'react-native'

type Props = {
  visible: boolean
  onRequestClose: () => void
  handleCloseModal: () => void
  title?: string
  children: React.ReactNode
}

export function ModalCard({
  visible,
  onRequestClose,
  handleCloseModal,
  title,
  children,
}: Props) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
    >
      <View className="absolute bottom-0 w-full">
        <View className="bg-Eerie p-5 w-full rounded-3xl justify-center items-center">
          <Text className="text-white text-xl font-GroteskBold mb-4">
            {title}
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

          <View className="w-full h-96 mb-8">{children}</View>
        </View>
      </View>
    </Modal>
  )
}
