import { Octicons } from '@expo/vector-icons'
import { View, TouchableOpacity, Text } from 'react-native'

type Props = {
  handleOpenModal: () => void
  title: string
  icon: keyof typeof Octicons.glyphMap
  children: React.ReactNode
}

export function ButtonProfileConfig({
  handleOpenModal,
  title,
  icon,
  children,
}: Props) {
  return (
    <View className="">
      <TouchableOpacity activeOpacity={0.5} onPress={handleOpenModal}>
        <View className="items-center justify-center">
          <View className="bg-violetApp items-center h-20 w-20 rounded-full justify-center">
            <Octicons name={icon} size={28} color="white" />
          </View>
          <Text className="text-grayApp text-center font-GroteskRegular mt-3">
            {title}
          </Text>
        </View>
      </TouchableOpacity>
      {children}
    </View>
  )
}
