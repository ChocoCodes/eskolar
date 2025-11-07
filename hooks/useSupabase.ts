"use client"
import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'

// Do not recreate client on every render 
export const useSupabaseClient = () => {
    const supabase = useMemo(() => createClient(), [])
    return { supabase }
}

export const useSupabaseAuthUser = () => {
  const { supabase } = useSupabaseClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
  
      if (!error && data.user) {
        setUser(data.user)
      } else {
          setError(error instanceof Error ? error.message : 'An unknown error has occured.');
      }
  
      setLoading(false)
    }
    fetchUser()
  }, [])

  return { user, loading, error }
}
