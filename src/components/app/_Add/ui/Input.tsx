import { Colors } from '@/constants/Colors'
import { Octicons } from '@expo/vector-icons'
import { View, Text, TextInput, TextInputProps } from 'react-native'

type Props = TextInputProps & {
  title: string
  icon: keyof typeof Octicons.glyphMap
}

export function Input({ title, icon, ...rest }: Props) {
  return (
    <View className="flex-row p-5 bg-Eerie rounded-lg items-center shadow-lg shadow-outerSpace">
      <View className="bg-outerSpace h-16 w-16 rounded-full items-center justify-center">
        <Octicons name={icon} size={24} color={`${Colors.darkGray}`} />
      </View>
      <View className="flex-1 ml-3 gap-2">
        <Text className="color-darkGray font-GroteskBold text-lg">{title}</Text>
        <TextInput
          className="h-14 border-2 rounded-md border-outerSpace p-3 color-darkGray"
          {...rest}
        />
      </View>
    </View>
  )
}
