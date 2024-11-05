import { View, Text } from 'react-native'
import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import ListExpenses from '@/components/app/_Expenses/ListExpenses'

export default function Expenses() {
  return (
    <SafeAreaIOS>
      <View className="flex-1 bg-chineseBlack p-5 pb-0">
        <Text className="font-GroteskBold text-2xl text-grayApp text-center mb-12">
          Despesas
        </Text>
        <ListExpenses />
      </View>
    </SafeAreaIOS>
  )
}
