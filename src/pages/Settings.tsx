import { useState, useEffect, type FormEvent } from 'react'
import { Loader2, AlertCircle, CheckCircle, Trash2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import AppNav from '../components/AppNav'

export default function Settings() {
  const [fullName, setFullName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      if (!isSupabaseConfigured) {
        setTimeout(() => {
          setFullName('Jordan Lee')
          setDisplayName('@jordanlee')
          setLoading(false)
        }, 500)
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }
      const { data } = await (supabase.from('weir_profiles').select('*').eq('user_id', session.user.id).single() as any)
      if (data) {
        setFullName(data.full_name ?? '')
        setDisplayName(data.display_name ?? '')
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setSaving(false); setSuccess(true) }, 700)
      return
    }
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setSaving(false); setError('Not authenticated.'); return }
    const { error: saveError } = await (supabase.from('weir_profiles').upsert({ user_id: session.user.id, full_name: fullName, display_name: displayName } as any) as any)
    setSaving(false)
    if (saveError) {
      setError('Failed to save profile. Please try again.')
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your public profile information.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="space-y-1.5">
                    <div className="w-20 h-4 bg-muted rounded animate-pulse" />
                    <div className="w-full h-10 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="displayName">Display name</Label>
                  <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="@handle" />
                </div>
                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                    <AlertCircle size={16} aria-label="Error" />
                    {error}
                  </div>
                )}
                {success && (
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
                    <CheckCircle size={16} aria-label="Success" />
                    Profile saved successfully.
                  </div>
                )}
                <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white" disabled={saving}>
                  {saving ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
                  {saving ? 'Saving...' : 'Save changes'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions. Proceed with care.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Delete account</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>Permanently remove all your data and detections.</p>
              </div>
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" size="sm">
                <Trash2 size={14} className="mr-1.5" />
                Delete account
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
