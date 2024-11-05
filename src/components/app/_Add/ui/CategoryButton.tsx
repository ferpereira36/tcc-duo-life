import { Colors } from '@/constants/Colors'
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

type CategoryButtonProps = {
  category: string
  onSelectCategory: (category: string) => void
  setModalVisible: (visible: boolean) => void
}

const CategoryButton = ({
  category,
  onSelectCategory,
  setModalVisible,
}: CategoryButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        borderBottomColor: `${Colors.outerSpace}`,
        borderBottomWidth: 2,
      }}
      onPress={() => {
        onSelectCategory(category)
        setModalVisible(false)
      }}
    >
      <Text className="text-gray-200 font-GroteskRegular text-lg self-center p-5">
        {category}
      </Text>
    </TouchableOpacity>
  )
}

export default CategoryButton
