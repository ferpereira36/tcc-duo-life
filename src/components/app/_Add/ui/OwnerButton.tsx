import { Colors } from '@/constants/Colors'
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

type OwnerButtonProps = {
  owner: string | undefined
  idButton: number
  onSelectOwner: (idButton: number) => void
  setModalVisible: (visible: boolean) => void
}

const OwnerButton = ({
  owner,
  idButton,
  onSelectOwner,
  setModalVisible,
}: OwnerButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        borderBottomColor: `${Colors.outerSpace}`,
        borderBottomWidth: 2,
      }}
      onPress={() => {
        onSelectOwner(idButton)
        setModalVisible(false)
      }}
    >
      <Text className="text-gray-200 font-GroteskRegular text-lg self-center p-5">
        {owner}
      </Text>
    </TouchableOpacity>
  )
}

export default OwnerButton
