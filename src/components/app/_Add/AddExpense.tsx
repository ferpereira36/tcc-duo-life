import ButtonViolet from '@/components/app/ui/ButtonViolet'
import React, { useState } from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import uuid from 'react-native-uuid'
import { router } from 'expo-router'
import { supabase } from '@/services/supabase'
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Input } from './ui/Input'
import ButtonCategory from '@/components/app/_Add/ButtonCategory'
import OwnerButton from '@/components/app/_Add/ButtonOwner'
import { storageService } from '@/services/storage/storageService'
import { groupStorageProps } from '@/types/storage/group'
import { stringToNumber } from '@/utils/format/stringToNumber'
import { dateToMonth } from '@/utils/format/dateToMonth'
import { upperFirstLetter } from '@/utils/format/upperFirstLetter'
import { ExpensesProps } from '@/types/ExpensesProps'
import ButtonMethod from './components/ButtonMethod'

const AddExpense = () => {
  const [name, setName] = useState('')
  const [money, setMoney] = useState('')
  const [category, setCategory] = useState('')
  const [owner, setOwner] = useState('')
  const [observation, setObservation] = useState('')
  const [method, setMethod] = useState('')
  const [idOwner, setIdOwner] = useState<string | undefined>('')
  const [dateExpense, setDateExpense] = useState<Date>(new Date())
  const storageGroup = storageService.getItem<groupStorageProps>('group')

  const handleChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate || dateExpense
    setDateExpense(currentDate)
  }

  const handleChangeValue = (text: string) => {
    const formattedValue = stringToNumber(text)
    setMoney(formattedValue)
  }

  const handleOwner = async (idButton: number, member: string | undefined) => {
    if (idButton === 1) {
      const id = storageGroup?.groupMemberOneId
      if (id && member) {
        setIdOwner(id)
        setOwner(member)
      } else {
        Alert.alert('Você colocou um responsável inválido!')
        setIdOwner(id)
        setOwner('')
      }
    }
    if (idButton === 2) {
      const id = storageGroup?.groupMemberTwoId
      if (id && member) {
        setIdOwner(id)
        setOwner(member)
      } else {
        Alert.alert('Você colocou um responsável inválido!')
        setIdOwner(id)
        setOwner('')
      }
    }
  }

  async function handleNew() {
    if (
      name !== '' &&
      name.length >= 3 &&
      money.length !== 0 &&
      category !== '' &&
      method !== '' &&
      idOwner
    ) {
      try {
        const id = String(uuid.v4())
        const date = dateExpense.toLocaleDateString('pt-BR')
        const month: string = dateToMonth(dateExpense)
        const title = upperFirstLetter(name)

        const newData: ExpensesProps = {
          id,
          name: title,
          value: money,
          date,
          category,
          owner_id: idOwner,
          method,
          observation,
        }

        const groupId = storageGroup?.groupId
        const currentExpenses = storageGroup?.groupExpenses || {}

        if (currentExpenses[month]) {
          // Se já houver despesas para o mês, adiciona a nova despesa ao array
          currentExpenses[month].push(newData)
        } else {
          // Se não houver despesas para o mês, cria um novo array com a nova despesa
          currentExpenses[month] = [newData]
        }

        const { error } = await supabase
          .from('groups')
          .update({
            expenses: currentExpenses,
          })
          .eq('id', groupId)

        if (error) {
          Alert.alert(
            'Poxa, não conseguimos adicionar sua despesa. Tente novamente, por favor.',
          )
          router.replace('/expenses')
        }

        if (!error) {
          const updatedGroup = {
            ...storageGroup,
            groupExpenses: currentExpenses,
          }
          storageService.setItem('group', updatedGroup)
          setName('')
          setMoney('')
          setCategory('')
          setDateExpense(new Date())
          setIdOwner('')
          setOwner('')
          setMethod('')
          setObservation('')
          router.navigate('/expenses')
        }
      } catch (error) {
        Alert.alert('Houve um problema ao cadastrar sua despesa!')
      }
    } else {
      Alert.alert('Preencha os dados corretamente!')
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="">
      <Text className="font-GroteskBold text-2xl text-grayApp text-center">
        Adicionar Despesa
      </Text>

      <View className="gap-5 mt-12">
        <Input title="Nome" icon="pencil" value={name} onChangeText={setName} />
        <Input
          title="Valor"
          icon="database"
          inputMode="numeric"
          keyboardType="numeric"
          value={money}
          onChangeText={handleChangeValue}
        />
        <ButtonCategory
          title="Categoria"
          icon="tag"
          text={category}
          selectedCategory={(text) => setCategory(text)}
        />
        <OwnerButton
          title="Responsável"
          icon="people"
          text={owner}
          selectedOwner={(idButton, member) => handleOwner(idButton, member)}
        />
        <View className="bg-Eerie rounded-lg w-full items-center justify-center py-6 pr-6 shadow-lg shadow-outerSpace">
          <RNDateTimePicker
            mode="date"
            value={dateExpense}
            locale="pt-BR"
            themeVariant="dark"
            accentColor="purple"
            onChange={handleChangeDate}
          />
        </View>
        <ButtonMethod text={method} SelectedMethod={setMethod} />
        <Input
          title="Observação (opcional)"
          icon="codescan-checkmark"
          value={observation}
          onChangeText={setObservation}
        />
      </View>
      <ButtonViolet text="Salvar" onPress={handleNew} />
    </ScrollView>
  )
}

export default AddExpense
