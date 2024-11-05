import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'

type Props = {
  color: string
}

export default function ButtonAdd({ color }: Props) {
  return (
    <View className="w-16 h-16 justify-center items-center bg-violetApp rounded-full mb-10">
      <Ionicons name="add-outline" size={24} color={color} />
    </View>
  )
}
