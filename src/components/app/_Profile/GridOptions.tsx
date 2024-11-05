import React from 'react'
import { Text, View } from 'react-native'
import ChangeName from './services/ChangeName'
import ChangeGroupName from './services/ChangeGroupName'
import ChangeLastName from './services/ChangeLastName'
import ChangePassword from './services/ChangePassword'
import ChangeSalaries from './services/ChangeSalaries'
import ButtonHelp from './services/ButtonHelp'
import ButtonReport from './services/ButtonReport'
import ButtonInfoGroup from './services/ButtonInfoGroup'
import { MethodCalcGroup } from './components/MethodCalcGroup'

const GridOptions = () => {
  return (
    <View className="mt-12">
      <Text className="text-grayApp font-GroteskRegular">
        Configurações pessoais
      </Text>
      <View className="flex-row items-center gap-6 mt-4">
        <ChangeName />
        <ChangeLastName />
        <ChangePassword />
      </View>
      <Text className="text-grayApp font-GroteskRegular mt-12">
        Configurações do grupo
      </Text>
      <View className="flex-row items-center gap-6 mt-4">
        <ButtonInfoGroup />
        <ChangeGroupName />
        <ChangeSalaries />
        <MethodCalcGroup />
      </View>
      <Text className="text-grayApp font-GroteskRegular mt-12">
        Suporte geral
      </Text>
      <View className="flex-row items-center gap-6 mt-4">
        <ButtonHelp />
        <ButtonReport />
      </View>
    </View>
  )
}

export default GridOptions
