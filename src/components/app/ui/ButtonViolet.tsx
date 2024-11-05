import { Colors } from '@/constants/Colors'
import React from 'react'
import {
  TouchableOpacityProps,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'

type Props = TouchableOpacityProps & {
  text: string
}

const ButtonViolet = ({ text, ...rest }: Props) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text className="color-white font-GroteskBold text-lg">{text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonViolet

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.violetApp,
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 40,
  },
})
