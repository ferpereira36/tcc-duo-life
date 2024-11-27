import ButtonViolet from '@/components/app/ui/ButtonViolet'
import GridOptions from '@/components/app/_Profile/GridOptions'
import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import InfoUser from '@/components/app/ui/infoUser'
import { supabase } from '@/services/supabase'
import { router } from 'expo-router'
import { View, Alert } from 'react-native'
import { storage } from '@/services/storage/mmkvStorage'
import { sleep } from '@/utils/sleep'

export default function Profile() {
  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        Alert.alert('Não foi possível sair do aplicativo')
      } else {
        Alert.alert('Volte sempre!')
        storage.trim()
        storage.clearAll()
        await sleep(300)
        router.replace('/loginScreen')
      }
    } catch (error) {
      // console.log('Problemas para desconectar', error)
      Alert.alert('Tente novamente!')
    }
  }

  return (
    <SafeAreaIOS>
      <View className="p-5 pb-0">
        <InfoUser />
        <GridOptions />
        <View className="mt-4">
          <ButtonViolet text="Sair" onPress={signOut} />
        </View>
      </View>
    </SafeAreaIOS>
  )
}
