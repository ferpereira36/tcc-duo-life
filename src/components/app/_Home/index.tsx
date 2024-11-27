import { View } from 'react-native'

import InfoUser from '@/components/app/ui/infoUser'

import { LimitedCards } from './components/LimitedCards'
import { CreditCard } from './components/CreditCard'
import { DownloadButton } from './components/DownloadButton'
import { InviteGroupButton } from './components/InviteGroupButton'
import { ButtonSelectHomeMonth } from './components/ButtonSelectHomeMonth'

import { nameMonth } from '@/utils/month/nameMonth'
import { useState } from 'react'

export default function HomeComponent() {
  const [month, setMonth] = useState<string>(nameMonth[new Date().getMonth()])

  return (
    <>
      <View className="p-5 pb-0 mb-8">
        <InfoUser />
        <CreditCard month={month} />
        <View className="flex-row gap-5 items-center justify-center mt-12">
          <DownloadButton />
          <InviteGroupButton />
          <ButtonSelectHomeMonth
            onMonthSelect={(onMonth) => setMonth(onMonth)}
          />
        </View>
      </View>
      <LimitedCards month={month} />
    </>
  )
}
