import { Text, View, Image } from 'react-native'
import { useFocusEffect } from 'expo-router'
import { useState } from 'react'
import { storageService } from '@/services/storage/storageService'
import { userStorageProps } from '@/types/storage/user'

export default function InfoUser() {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [photo, setPhoto] = useState('')

  useFocusEffect(() => {
    const storageUser = storageService.getItem<userStorageProps>('user')
    const nameUser = storageUser?.name
    if (nameUser) {
      setName(nameUser)
    }
    const lastNameUser = storageUser?.lastName
    if (lastNameUser) {
      setLastName(storageUser?.lastName)
    }
    const genderUser = storageUser?.gender
    if (genderUser) {
      setPhoto(genderUser)
    }
  })
  const userPhoto =
    photo === 'male'
      ? require('@/assets/images/male.jpg')
      : require('@/assets/images/female.jpg')

  return (
    <View className="flex-row items-center">
      {userPhoto && (
        <Image source={userPhoto} alt="" className="w-16 h-16 rounded-full" />
      )}
      <View className="ml-4">
        <Text className="text-white text-lg font-poppins">
          {name} {lastName}
        </Text>
        <Text className="text-graniteGray">Olá, você está no Duo Life!</Text>
      </View>
    </View>
  )
}
