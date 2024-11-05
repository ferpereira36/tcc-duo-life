import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import AddExpense from '@/components/app/_Add/AddExpense'

export default function NewExpense() {
  return (
    <SafeAreaIOS>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-chineseBlack p-5 pb-0"
        enabled
      >
        <AddExpense />
      </KeyboardAvoidingView>
    </SafeAreaIOS>
  )
}
