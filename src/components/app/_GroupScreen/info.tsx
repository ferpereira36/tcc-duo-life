import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import React from 'react'
import { View, Text } from 'react-native'

export default function InfoGroup() {
  const storageGroup = storageService.getItem<groupStorageProps>('group')

  return (
    <>
      <View className="flex-row">
        <Text className="text-white text-xl font-GroteskBold">Nome: </Text>
        <Text className="text-grayApp text-lg font-GroteskRegular">
          {storageGroup?.groupName}
        </Text>
      </View>
      <View className=" mt-8">
        <Text className="text-white text-xl font-GroteskBold">Membros</Text>
        <Text className="text-grayApp text-lg font-GroteskRegular">
          1: {storageGroup?.groupMemberOneName}
        </Text>
        {storageGroup?.groupMemberTwoName && (
          <Text className="text-grayApp text-lg font-GroteskRegular">
            2: {storageGroup?.groupMemberTwoName}
          </Text>
        )}
      </View>
      <View className=" mt-8">
        <Text className="text-white text-xl font-GroteskBold">Salários</Text>
        <Text className="text-grayApp text-lg font-GroteskRegular">
          Membro 1: {storageGroup?.groupSalaries.salaryOne}
        </Text>
        <Text className="text-grayApp text-lg font-GroteskRegular">
          Membro 2: {storageGroup?.groupSalaries.salaryTwo}
        </Text>
      </View>
    </>
  )
}
