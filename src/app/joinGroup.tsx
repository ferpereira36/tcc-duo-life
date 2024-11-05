import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native'
import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import ButtonViolet from '@/components/app/ui/ButtonViolet'
import DismissKeyboard from '@/components/app/DismissKeyboard'
import { useState } from 'react'
import { supabase } from '@/services/supabase'
import { getUserId } from '@/services/supabase/group'
import { router } from 'expo-router'
import { sleep } from '@/utils/sleep'

export default function JoinGroup() {
  const [idInvited, setIdInvited] = useState('')

  async function handleJoinGroup() {
    const groupId = idInvited
    const userId = await getUserId()
    const { data: memberTwoId, error: errorIdGroup } = await supabase
      .from('groups')
      .select('member_2')
      .eq('id', groupId)
      .single()

    if (errorIdGroup) {
      throw errorIdGroup
    } else {
      const memberTwo = await memberTwoId?.member_2
      if (memberTwo) {
        Alert.alert('Este grupo já tem membros suficientes!')
      } else {
        const { error: errorGroup } = await supabase
          .from('groups')
          .update({ member_2: userId })
          .eq('id', groupId)

        if (errorGroup) {
          Alert.alert('Verifique as informações!')
        } else {
          const { error: errorProfile } = await supabase
            .from('profiles')
            .update({ group_id: groupId })
            .eq('id', userId)

          if (errorProfile) {
            Alert.alert('Verifique as informações!')
          } else {
            Alert.alert('Agora você faz parte do grupo!')
            sleep(300)
            router.replace('/unlockScreen')
          }
        }
      }
    }
  }

  return (
    <SafeAreaIOS>
      <DismissKeyboard>
        <View className="p-5 pb-0 mb-8 h-full w-full items-center justify-center">
          <Text className="text-white mb-6 text-2xl">
            Informe os dados do grupo
          </Text>
          <TextInput
            placeholder="Id de convite"
            placeholderTextColor={'gray'}
            value={idInvited}
            onChangeText={setIdInvited}
            className="text-white h-14 w-full border-graniteGray border-2 rounded-md px-2"
          />
          <View className="w-full mt-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-grayApp text-right">Criar um grupo</Text>
            </TouchableOpacity>
          </View>
          <ButtonViolet
            text="Entrar no grupo"
            onPress={() => handleJoinGroup()}
          />
        </View>
      </DismissKeyboard>
    </SafeAreaIOS>
  )
}
