import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', !!supabaseKey) // just shows true/false for security

const supabase = createClient(supabaseUrl!, supabaseKey!)

export function UserSync() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      const syncUser = async () => {
        console.log('Syncing user:', user.id)
        const { error } = await supabase
          .from('users')
          .upsert([
            {
              clerk_user_id: user.id,
              email: user.primaryEmailAddress?.emailAddress,
            }
          ], { onConflict: 'clerk_user_id' })

        if (error) {
          console.error('Error syncing user:', error)
        } else {
          console.log('User synced successfully')
        }
      }

      syncUser()
    }
  }, [user, isLoaded])

  return null
}
