import { Octicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import React, { useState } from 'react'
import { View, Modal, TouchableOpacity, Text, ScrollView } from 'react-native'
import CategoryButton from './ui/CategoryButton'

type Props = {
  selectedCategory: (text: string) => void
  title: string
  icon: keyof typeof Octicons.glyphMap
  text: string
}

const ButtonCategory = ({ selectedCategory, title, icon, text }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <View className="flex-row p-5 bg-Eerie rounded-lg items-center shadow-lg shadow-outerSpace">
      <View className="bg-outerSpace h-16 w-16 rounded-full items-center justify-center">
        <Octicons name={icon} size={24} color={`${Colors.darkGray}`} />
      </View>
      <View className="flex-1 ml-3 gap-2">
        <Text className="color-darkGray font-GroteskBold text-lg">{title}</Text>
        <TouchableOpacity onPress={handleOpenModal}>
          <View className="h-14 border-2 rounded-md border-outerSpace p-3 color-darkGray justify-center">
            <Text className="text-darkGray">{text}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        animationType="fade"
      >
        <View className="absolute bottom-0 w-full">
          <View className="bg-Eerie p-5 w-full rounded-3xl justify-center items-center">
            <Text className="text-white text-xl font-GroteskBold mb-4">
              Escolha uma categoria
            </Text>
            <View className="absolute top-5 right-5">
              <TouchableOpacity onPress={handleCloseModal}>
                <Octicons
                  name={'x-circle-fill'}
                  size={24}
                  color={`${Colors.darkGray}`}
                />
              </TouchableOpacity>
            </View>

            <View className="w-full h-96 mb-8">
              <ScrollView>
                <CategoryButton
                  category="Alimentação"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Assinaturas"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Aluguel"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Beleza"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Boletos"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Conta de água"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Conta de energia"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Comunicação"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Doações"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Educação"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Entretenimento"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Esportes"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Farmácia"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Ferramentas"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Finanças"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Imposto"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Lazer"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Moradia"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Pets"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Saúde"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Serviços"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Supermercado"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Tecnologia"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Trabalho"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Transporte"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
                <CategoryButton
                  category="Viagens"
                  onSelectCategory={selectedCategory}
                  setModalVisible={setModalVisible}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ButtonCategory
