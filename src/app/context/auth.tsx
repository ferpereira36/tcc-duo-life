import { useEffect, createContext, useState, PropsWithChildren } from 'react'
import { router } from 'expo-router'
import { supabase } from '@/services/supabase'
import { storage } from '@/services/storage/mmkvStorage'

export const AuthContext = createContext({
  session: false,
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        console.log('Sessao verdadeira, enviado para unlock')
        setSession(true)
        router.replace('/unlockScreen')
      } else {
        console.log('volta!!!')
        storage.trim()
        storage.clearAll()
        setSession(false)
        router.replace('/loginScreen')
      }
    }
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  )
}
