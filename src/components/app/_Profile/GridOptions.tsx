import React from 'react'
import { Text, View } from 'react-native'
import ButtonHelp from './services/ButtonHelp'
import ButtonReport from './services/ButtonReport'
import { InfoGroup } from './components/group/InfoGroup'
import { MethodCalcGroup } from './components/group/MethodCalcGroup'
import { ChangeGroupName } from './components/group/ChangeGroupName'
import { ChangeGroupSalaries } from './components/group/ChangeGroupSalaries'
import { ChangeName } from './components/user/ChangeName'
import { ChangeLastName } from './components/user/ChangeLastName'
import { ChangePassword } from './components/user/ChangePassword'

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
        <InfoGroup />
        <ChangeGroupName />
        <ChangeGroupSalaries />
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
