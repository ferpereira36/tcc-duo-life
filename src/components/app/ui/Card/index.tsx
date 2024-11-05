import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ExpensesProps } from '@/types/ExpensesProps'
import CardModal from './modal'
import { switchCategory } from '@/utils/card/switchCategory'

type Props = {
  data: ExpensesProps
  onPressRemove: () => void
}

export function Card({ data, onPressRemove }: Props) {
  const [modalVisible, setModalVisible] = useState(false)

  const MAX_LENGTH = 16

  return (
    <>
      <View className="mb-6">
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setModalVisible(true)}
        >
          <View className="bg-Eerie rounded-xl flex-1 justify-center items-center border-l-4 border-violetApp">
            <View className="flex-row w-full justify-between p-3">
              <View className="flex-row">
                <View className="bg-violetApp w-16 h-16 mr-4 items-center justify-center rounded-full">
                  <Ionicons
                    name={switchCategory(data.category)}
                    size={28}
                    color="white"
                  />
                </View>
                <View className="gap-2">
                  <Text className="font-GroteskBold text-lg text-white">
                    {data.name.length > MAX_LENGTH
                      ? `${data.name.substring(0, MAX_LENGTH)}...`
                      : data.name}
                  </Text>
                  <Text className="font-poppins text-sm text-grayApp">
                    {data.category}
                  </Text>
                </View>
              </View>
              <View className="gap-2 items-end">
                <Text className="font-GroteskBold text-base text-white">
                  R$ {data.value}
                </Text>
                <Text className="font-poppins text-sm text-grayApp">
                  {data.date}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <CardModal
        data={data}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPressRemove={onPressRemove}
      />
    </>
  )
}
