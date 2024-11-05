import React, { useEffect, useRef, useState } from 'react'
import { Animated, Text, View, StyleSheet } from 'react-native'

const AnimatedString = ({ text = '', duration = 3000 }) => {
  const animationValue = useRef(new Animated.Value(0)).current // Controla o índice da string
  const [displayedText, setDisplayedText] = useState('') // Texto exibido

  useEffect(() => {
    const textLength = text.length

    // Animação do índice de 0 até o comprimento da string
    Animated.timing(animationValue, {
      toValue: textLength, // Vai até o final da string
      duration, // Duração da animação
      useNativeDriver: false,
    }).start()

    // Listener para atualizar o texto conforme a animação avança
    animationValue.addListener(({ value }) => {
      const index = Math.floor(value) // Arredonda o valor para um índice inteiro
      setDisplayedText(text.slice(0, index)) // Exibe a substring até o índice atual
    })

    // Limpa o listener quando o componente desmonta
    return () => {
      animationValue.removeAllListeners()
    }
  }, [text, duration, animationValue])

  return (
    <View style={styles.container}>
      <Text style={styles.animatedText}>
        {displayedText} {/* Exibe a string animada */}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedText: {
    fontSize: 32, // Tamanho da string
    fontWeight: 'bold',
  },
})

export default AnimatedString
