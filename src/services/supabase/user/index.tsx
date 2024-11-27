import { storage } from '@/services/storage/mmkvStorage'
import { supabase } from '@/services/supabase'
import { router } from 'expo-router'

export async function GetSaveUserInformation() {
  let id: string
  let name: string | undefined
  let lastName: string | undefined
  let gender: string | undefined

  const getUserId = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      // console.log('Erro getUserId')
      await supabase.auth.signOut()
      router.replace('/loginScreen')
    } else {
      const userId = await user?.id
      if (userId) {
        id = userId
      }
    }
  }

  const getNameUser = async () => {
    const userId = id

    const { data: firstName, error } = await supabase
      .from('profiles')
      .select('first_name')
      .eq('id', userId)
      .single()

    if (error) {
      // console.log('Erro getNameUser')
      await supabase.auth.signOut()
      router.replace('/loginScreen')
    } else {
      const nameUser = await firstName?.first_name
      name = nameUser
    }
  }

  const getLastNameUser = async () => {
    const userId = id

    const { data: lastNameUser, error } = await supabase
      .from('profiles')
      .select('last_name')
      .eq('id', userId)
      .single()

    if (error) {
      // console.log('Erro getLastNameUser')
      await supabase.auth.signOut()
      router.replace('/loginScreen')
    } else {
      const last = await lastNameUser?.last_name
      lastName = last
    }
  }

  const getGender = async () => {
    const userId = id

    const { data: genderUser, error } = await supabase
      .from('profiles')
      .select('sex_gender')
      .eq('id', userId)
      .single()

    if (error) {
      // console.log('Erro getGender')
      await supabase.auth.signOut()
      router.replace('/loginScreen')
    } else {
      const userGender = await genderUser?.sex_gender
      gender = userGender
    }
  }

  await getUserId()
  await getNameUser()
  await getLastNameUser()
  await getGender()
  const handleSave = async () => {
    if (id && name && lastName && gender) {
      // console.log('Retornou valores')
      storage.set('user', JSON.stringify({ id, name, lastName, gender }))
      // return { id, name, lastName, gender }
    }
  }
  await handleSave()
}
