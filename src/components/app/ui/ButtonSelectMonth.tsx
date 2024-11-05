import { Colors } from '@/constants/Colors'
import { Months } from '@/utils/month/months'
import { nameMonth } from '@/utils/month/nameMonth'
import { Octicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { Modal, TouchableOpacity, View, Text, ViewStyle } from 'react-native'

type Props = {
  onMonthSelect: (month: string) => void
  style?: ViewStyle
}

export default function ButtonSelectMonth({ onMonthSelect, ...rest }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedMonth, setSelectedMonth] = useState<string>(
    nameMonth[new Date().getMonth()],
  )

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleMonthChange = (value: string) => {
    const selected = Months.find((month) => month.value === value)
    if (selected) {
      setSelectedMonth(selected.label)
      onMonthSelect(selected.label)
    }
    setModalVisible(false)
  }

  return (
    <>
      <TouchableOpacity onPress={handleOpenModal} style={{ width: '100%' }}>
        <View
          className="h-14 border-2 rounded-md border-taupeGray p-3 w-2/5"
          {...rest}
        >
          <Text className="text-grayApp text-center text-lg font-GroteskRegular">
            {selectedMonth}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
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
            <View className="">
              <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue) => handleMonthChange(itemValue)}
                itemStyle={{ color: 'white', margin: 0, padding: 0 }}
              >
                {Months.map((month) => (
                  <Picker.Item
                    key={month.value}
                    label={month.label}
                    value={month.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
