import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [status, setStatus] = useState<'loading' | 'authed' | 'unauthed'>('loading')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setStatus('authed')
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'authed' : 'unauthed')
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? 'authed' : 'unauthed')
    })
    return () => subscription.unsubscribe()
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 size={32} className="animate-spin text-indigo-500" aria-label="Loading" />
      </div>
    )
  }
  if (status === 'unauthed') {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
