import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'

import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import DismissKeyboard from '@/components/app/DismissKeyboard'

import { supabase } from '@/services/supabase'
import { getUserId } from '@/services/supabase/group'

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('')
  const [memberSalary, setMemberSalary] = useState('')

  const handleSalaryMember = (text: string) => {
    // Remove tudo que não for número
    const cleaned = text.replace(/\D/g, '')

    // Converte para um valor numérico e divide por 100 para pegar os centavos
    let formattedValue = (Number(cleaned) / 100).toFixed(2)

    // Formata no estilo de moeda brasileira
    formattedValue = formattedValue
      .replace('.', ',') // Troca ponto por vírgula
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Insere pontos a cada milhar

    setMemberSalary(formattedValue)
  }

  const handleCreateGroup = async () => {
    const groupNameCheck = groupName.toLowerCase()
    if (
      memberSalary !== '0,00' &&
      memberSalary.length > 5 &&
      groupNameCheck !== 'admin' &&
      groupNameCheck !== 'adm' &&
      groupNameCheck.length >= 3 &&
      groupNameCheck.length < 16
    ) {
      const newData = {
        salaryOne: memberSalary,
        salaryTwo: '0,00',
      }
      const userId = await getUserId()
      const { error } = await supabase
        .from('groups')
        .insert([{ name: groupName, member_1: userId, salaries: newData }])
      if (error) {
        Alert.alert('Erro: Houve instabilidade ao criar seu grupo')
      } else {
        Alert.alert('Seja bem-vindo(a). Grupo criado com sucesso!')
        router.replace('/unlockScreen')
      }
    } else {
      Alert.alert('Preencha corretamente!')
    }
  }

  return (
    <SafeAreaIOS>
      <DismissKeyboard>
        <View className="p-5 pb-0 mb-8 h-full w-full items-center justify-center">
          <Text className="text-white mb-6 text-2xl">
            Informe os dados do grupo
          </Text>
          <View className="w-full gap-4">
            <TextInput
              placeholder="Nome do Grupo"
              placeholderTextColor={'gray'}
              value={groupName}
              onChangeText={setGroupName}
              className="text-white h-14 w-full border-graniteGray border-2 rounded-md px-2"
            />
            <TextInput
              placeholder="Seu salário"
              placeholderTextColor={'gray'}
              value={memberSalary}
              onChangeText={handleSalaryMember}
              keyboardType="numeric"
              className="text-white h-14 w-full border-graniteGray border-2 rounded-md px-2"
            />
          </View>

          <View className="w-full mt-2">
            <TouchableOpacity onPress={() => router.navigate('/joinGroup')}>
              <Text className="text-grayApp text-right">
                Entrar em um grupo existente
              </Text>
            </TouchableOpacity>
          </View>

          <ButtonViolet
            text="Criar Grupo"
            onPress={() => handleCreateGroup()}
          />
        </View>
      </DismissKeyboard>
    </SafeAreaIOS>
  )
}
