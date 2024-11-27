import { Colors } from '@/constants/Colors'
import { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

type Props = {
  handleOpenModal: () => void
  selectedGender: string
  children: React.ReactNode
}

export function ButtonRegisterGender({
  handleOpenModal,
  selectedGender,
  children,
}: Props) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (selectedGender) {
      setText(selectedGender)
    } else {
      setText('Gênero')
    }
  }, [selectedGender])

  return (
    <TouchableOpacity onPress={handleOpenModal} style={{ width: '100%' }}>
      <View className="w-full h-14 px-2 border-graniteGray border-2 rounded-md justify-center">
        <View>
          <Text
            style={{ color: selectedGender ? `${Colors.grayApp}` : 'gray' }}
          >
            {text}
          </Text>
        </View>
        {children}
      </View>
    </TouchableOpacity>
  )
}
