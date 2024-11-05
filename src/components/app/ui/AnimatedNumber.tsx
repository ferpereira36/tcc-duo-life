import React, { useEffect, useRef, useState } from 'react'
import { Animated, Text, View, StyleSheet } from 'react-native'

const AnimatedNumber = ({ toValue = 1000, duration = 3000 }) => {
  const animationValue = useRef(new Animated.Value(0)).current // Valor inicial da animação
  const [displayValue, setDisplayValue] = useState(0) // Valor exibido na tela

  useEffect(() => {
    // Animação do valor inicial até o valor passado como prop
    Animated.timing(animationValue, {
      toValue, // Usa a prop toValue
      duration, // Usa a prop duration
      useNativeDriver: false, // Não pode usar useNativeDriver com valores de texto
    }).start()

    // Listener para atualizar o valor exibido
    animationValue.addListener(({ value }) => {
      setDisplayValue(Math.floor(value)) // Arredonda para evitar números decimais
    })

    // Limpa o listener quando o componente desmonta
    return () => {
      animationValue.removeAllListeners()
    }
  }, [toValue, duration, animationValue])

  return (
    <View style={styles.container}>
      <Text style={styles.number}>
        {displayValue} {/* Exibe o valor animado */}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 48, // Tamanho do número
    fontWeight: 'bold',
  },
})

export default AnimatedNumber
