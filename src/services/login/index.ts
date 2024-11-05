import { supabase } from '@/services/supabase'

export async function authLogin(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    return { sucess: false }
  } else {
    return { sucess: true }
  }
}
