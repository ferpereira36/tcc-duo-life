import { Keyboard, TouchableWithoutFeedback } from 'react-native'

type Props = {
  children: React.ReactNode
}

const DismissKeyboard = ({ children }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  )
}

export default DismissKeyboard
