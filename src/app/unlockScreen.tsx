import { useEffect } from 'react'
import { router } from 'expo-router'
import { supabase } from '@/services/supabase'
import { getGroupId, GetSaveGroupInformation } from '@/services/supabase/group'
import { GetSaveUserInformation } from '@/services/supabase/user'
import { View, Text, ActivityIndicator } from 'react-native'
import { sleep } from '@/utils/sleep'
import { storage } from '@/services/storage/mmkvStorage'
import { userStorageProps } from '@/types/storage/user'
import { storageService } from '@/services/storage/storageService'

export default function UnlockScreen() {
  useEffect(() => {
    const loadUser = async () => {
      // console.log('processando...')
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        try {
          const idGroup = await getGroupId()
          if (idGroup) {
            await GetSaveUserInformation()
            await GetSaveGroupInformation()
            const storageUser = storageService.getItem<userStorageProps>('user')
            let idUser = storageUser?.id
            while (!idUser) {
              storage.trim()
              await GetSaveUserInformation()
              await GetSaveGroupInformation()
              idUser = storageUser?.id
            }
            router.replace('/')
          } else {
            router.replace('/createGroup')
          }
        } catch (error) {
          await supabase.auth.signOut()
          sleep(300)
          router.replace('/loginScreen')
        }
      } else {
        await supabase.auth.signOut()
        sleep(300)
        router.replace('/loginScreen')
      }
    }
    loadUser()
  }, [])

  return (
    <View className="w-full h-full bg-violetApp items-center justify-center">
      <ActivityIndicator />
      <Text className="mt-2 text-xl text-white font-GroteskBold">
        Carregando dados...
      </Text>
    </View>
  )
}
