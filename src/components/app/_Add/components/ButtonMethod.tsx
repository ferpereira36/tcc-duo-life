import { ModalCard } from '@/components/app/ui/ModalCard'
import { ButtonExpenseMethod } from '@/components/app/ui/ButtonExpenseMethod'
import { useState } from 'react'
import { View } from 'react-native'
import { Method } from '@/components/app/_Add/ui/Method'

type Props = {
  text: string
  SelectedMethod: (text: string) => void
}

export default function ButtonMethod({ text, SelectedMethod }: Props) {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <ButtonExpenseMethod
      handleOpenModal={() => setModalVisible(true)}
      icon="credit-card"
      title="Método de Pagamento"
      text={text}
    >
      <ModalCard
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        handleCloseModal={() => setModalVisible(false)}
      >
        <View className="p-5">
          <Method
            icon="pix"
            color="green"
            text="Pix"
            onSelectMethod={SelectedMethod}
            setModalVisible={setModalVisible}
          />
          <Method
            icon="cc-mastercard"
            color="orange"
            text="Crédito Mastercard"
            onSelectMethod={SelectedMethod}
            setModalVisible={setModalVisible}
          />
          <Method
            icon="cc-visa"
            color="skyblue"
            text="Crédito Visa"
            onSelectMethod={SelectedMethod}
            setModalVisible={setModalVisible}
          />
          <Method
            icon="money-bill-1"
            color="yellowgreen"
            text="Dinheiro"
            onSelectMethod={SelectedMethod}
            setModalVisible={setModalVisible}
          />
        </View>
      </ModalCard>
    </ButtonExpenseMethod>
  )
}
