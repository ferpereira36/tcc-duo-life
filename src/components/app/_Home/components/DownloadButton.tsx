import { Colors } from '@/constants/Colors'
import { Octicons, Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { Modal, TouchableOpacity, View, Text } from 'react-native'
import { nameMonth } from '@/utils/month/nameMonth'
import ButtonSelectMonth from '@/components/app/ui/ButtonSelectMonth'
import { createPDF } from '@/utils/pdf/createPDF'

export function DownloadButton() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [month, setMonth] = useState(nameMonth[new Date().getMonth()])

  const handleCreatePDF = async () => {
    if (month) {
      await createPDF(month)
    }
    setModalVisible(false)
  }

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View className="rounded-md w-16 h-16 bg-outerSpace items-center justify-center">
          <Feather name="download" size={28} color={'cyan'} />
        </View>
      </TouchableOpacity>
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View className="absolute bottom-0 w-full">
          <View className="bg-Eerie p-5 rounded-3xl">
            <View className="w-full items-end">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Octicons
                  name={'x-circle-fill'}
                  size={24}
                  color={`${Colors.darkGray}`}
                />
              </TouchableOpacity>
            </View>
            <View className="my-12 gap-12 w-full items-center">
              <View className="w-full items-center gap-3 flex-row">
                <Text className="text-grayApp font-GroteskBold text-lg">
                  Escolha o mês do relatório:
                </Text>
                <ButtonSelectMonth
                  onMonthSelect={(monthSelect: string) => setMonth(monthSelect)}
                />
              </View>
              <TouchableOpacity onPress={handleCreatePDF}>
                <View className="bg-green-900 px-8 py-4 rounded-md">
                  <Text className="text-grayApp text-center">Gerar PDF</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
