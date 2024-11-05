import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'

import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { Colors } from '@/constants/Colors'
import ButtonAdd from '@/components/app/ui/ButtonAdd'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  return <TabLayoutNav />
}

function TabLayoutNav() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.violetApp,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: 'black',
          borderColor: 'black',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Despesas',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="file-tray-stacked-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            if (focused) {
              return <ButtonAdd color={'white'} />
            } else {
              return <ButtonAdd color={color} />
            }
          },
        }}
      />
      <Tabs.Screen
        name="graphs"
        options={{
          title: 'Gráficos',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pie-chart-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(suport)"
        options={{
          title: 'Suporte',
          href: null,
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="help-buoy-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
