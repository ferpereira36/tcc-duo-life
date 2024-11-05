import { View } from 'react-native'

import SafeAreaIOS from '@/components/app/SafeAreaIOS'
import InfoUser from '@/components/app/ui/infoUser'
import CreditCard from '@/components/app/ui/CreditCard'
import DownloadButton from '@/components/app/_Home/DownloadButton'
import InviteGroupButton from '@/components/app/_Home/InviteGroupButton'
import LimitedCards from '@/components/app/ui/LimitedCards'

export default function Home() {
  return (
    <SafeAreaIOS>
      <View className="p-5 pb-0 mb-8">
        <InfoUser />
        <CreditCard />
        <View className="flex-row gap-5 items-center justify-center mt-12">
          <DownloadButton />
          <InviteGroupButton />
        </View>
      </View>
      <LimitedCards />
    </SafeAreaIOS>
  )
}
