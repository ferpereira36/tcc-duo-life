import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { DonutGraph } from '@/components/app/_Graphs/components/DonutGraph'
import ProgressBar from '@/components/app/_Graphs/components/ProgressBar'
import { GroupDivision } from '@/components/app/_Graphs/components/GroupDivision'
import ButtonSelectMonth from '@/components/app/ui/ButtonSelectMonth'
import { nameMonth } from '@/utils/month/nameMonth'

export default function RenderGraphs() {
  const [month, setMonth] = useState(nameMonth[new Date().getMonth()])
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ButtonSelectMonth
        onMonthSelect={(onMonth) => setMonth(onMonth)}
        style={{ marginBottom: 24, alignSelf: 'flex-end' }}
      />
      <ProgressBar month={month} />
      <DonutGraph month={month} />
      <GroupDivision month={month} />
    </ScrollView>
  )
}
