import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { createClient as createClientServer } from '@/lib/supabase/server'

// Do not recreate client on every render 
export const useSupabaseClient = () => {
    const supabase = useMemo(() => createClient(), [])
    return { supabase }
}

export const useSupabaseServer = () => {
    const supabase = useMemo(() => createClientServer(), [])
    return { supabase }
}

export const useSupabaseAuthUser = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async () => {
    const { supabase } = useSupabaseClient()
    const { data, error } = await supabase.auth.getUser()

    if (!error && data.user) {
      setUser(data.user)
    } else {
        setError(error instanceof Error ? error.message : 'An unknown error has occured.');
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return { user, loading, error }
}
