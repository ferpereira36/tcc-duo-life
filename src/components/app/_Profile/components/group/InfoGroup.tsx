import { useState } from 'react'
import { View, Text } from 'react-native'
import { ButtonProfileConfig } from '@/components/app/ui/ButtonProfileConfig'
import { ModalCard } from '@/components/app/ui/ModalCard'
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'

export function InfoGroup() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const storageGroup = storageService.getItem<groupStorageProps>('group')

  return (
    <ButtonProfileConfig
      handleOpenModal={() => setModalVisible(true)}
      icon="info"
      title={'Detalhes\ndo Grupo'}
    >
      <ModalCard
        title="Informações do Grupo"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        handleCloseModal={() => setModalVisible(false)}
      >
        <View className="mt-16">
          <View className="flex-row">
            <Text className="text-white text-xl font-GroteskBold">Nome: </Text>
            <Text className="text-grayApp text-lg font-GroteskRegular">
              {storageGroup?.groupName}
            </Text>
          </View>
          <View className=" mt-8">
            <Text className="text-white text-xl font-GroteskBold">Membros</Text>
            <Text className="text-grayApp text-lg font-GroteskRegular">
              Membro 1: {storageGroup?.groupMemberOneName}
            </Text>
            {storageGroup?.groupMemberTwoName && (
              <Text className="text-grayApp text-lg font-GroteskRegular">
                Membro 2: {storageGroup?.groupMemberTwoName}
              </Text>
            )}
          </View>
          <View className=" mt-8">
            <Text className="text-white text-xl font-GroteskBold">
              Salários
            </Text>
            <Text className="text-grayApp text-lg font-GroteskRegular">
              Membro 1: {storageGroup?.groupSalaries.salaryOne}
            </Text>
            <Text className="text-grayApp text-lg font-GroteskRegular">
              Membro 2: {storageGroup?.groupSalaries.salaryTwo}
            </Text>
          </View>
        </View>
      </ModalCard>
    </ButtonProfileConfig>
  )
}
