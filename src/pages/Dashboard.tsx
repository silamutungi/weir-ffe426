import { useState, useEffect, useCallback } from 'react'
import { Shield, AlertTriangle, CheckCircle, XCircle, DollarSign, RefreshCw, Loader2 } from 'lucide-react'

import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency, formatRelative } from '../lib/utils'
import type { Detection } from '../types'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import AppNav from '../components/AppNav'

const SEED_DETECTIONS: Detection[] = [
  { id: '1', user_id: 'demo', platform: 'TikTok', content_url: 'https://tiktok.com/@brand/video/1', thumbnail_url: '', match_confidence: 97, risk_level: 'high', status: 'pending', estimated_cpm: 4.2, estimated_impressions: 820000, detected_at: new Date(Date.now() - 1800000).toISOString(), resolved_at: null, notes: null, deleted_at: null, created_at: new Date().toISOString() },
  { id: '2', user_id: 'demo', platform: 'Instagram', content_url: 'https://instagram.com/p/abc123', thumbnail_url: '', match_confidence: 91, risk_level: 'high', status: 'pending', estimated_cpm: 6.1, estimated_impressions: 340000, detected_at: new Date(Date.now() - 7200000).toISOString(), resolved_at: null, notes: null, deleted_at: null, created_at: new Date().toISOString() },
  { id: '3', user_id: 'demo', platform: 'YouTube', content_url: 'https://youtube.com/watch?v=xyz', thumbnail_url: '', match_confidence: 88, risk_level: 'medium', status: 'monetized', estimated_cpm: 8.5, estimated_impressions: 1200000, detected_at: new Date(Date.now() - 86400000).toISOString(), resolved_at: new Date().toISOString(), notes: 'Licensed at $8.50 CPM', deleted_at: null, created_at: new Date().toISOString() },
  { id: '4', user_id: 'demo', platform: 'Meta Ads', content_url: 'https://facebook.com/ads/123', thumbnail_url: '', match_confidence: 95, risk_level: 'high', status: 'takedown', estimated_cpm: 3.8, estimated_impressions: 560000, detected_at: new Date(Date.now() - 172800000).toISOString(), resolved_at: new Date().toISOString(), notes: 'Takedown request sent', deleted_at: null, created_at: new Date().toISOString() },
  { id: '5', user_id: 'demo', platform: 'Google Ads', content_url: 'https://ads.google.com/c/123', thumbnail_url: '', match_confidence: 79, risk_level: 'medium', status: 'approved', estimated_cpm: 5.2, estimated_impressions: 430000, detected_at: new Date(Date.now() - 259200000).toISOString(), resolved_at: new Date().toISOString(), notes: 'Approved usage', deleted_at: null, created_at: new Date().toISOString() },
  { id: '6', user_id: 'demo', platform: 'Twitter', content_url: 'https://twitter.com/brand/status/1', thumbnail_url: '', match_confidence: 83, risk_level: 'low', status: 'disputed', estimated_cpm: 2.1, estimated_impressions: 90000, detected_at: new Date(Date.now() - 345600000).toISOString(), resolved_at: null, notes: 'Dispute filed', deleted_at: null, created_at: new Date().toISOString() }
]

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-800' },
  takedown: { label: 'Takedown', color: 'bg-red-100 text-red-800' },
  monetized: { label: 'Monetized', color: 'bg-indigo-100 text-indigo-800' },
  disputed: { label: 'Disputed', color: 'bg-orange-100 text-orange-800' }
}

export default function Dashboard() {
  const [detections, setDetections] = useState<Detection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchDetections = useCallback(async () => {
    setLoading(true)
    setError(null)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setDetections(SEED_DETECTIONS); setLoading(false) }, 600)
      return
    }
    const { data, error: fetchError } = await (supabase.from('weir_detections').select('*').is('deleted_at', null).order('detected_at', { ascending: false }) as any)
    if (fetchError) {
      setError('Failed to load detections. Please try again.')
    } else {
      setDetections(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchDetections() }, [fetchDetections])

  async function handleAction(id: string, status: Detection['status']) {
    setActionLoading(id + status)
    if (!isSupabaseConfigured) {
      setTimeout(() => {
        setDetections(prev => prev.map(d => d.id === id ? { ...d, status, resolved_at: new Date().toISOString() } : d))
        setActionLoading(null)
      }, 500)
      return
    }
    await (supabase.from('weir_detections').update({ status, resolved_at: new Date().toISOString() } as any).eq('id', id) as any)
    setActionLoading(null)
    fetchDetections()
  }

  const pending = detections.filter(d => d.status === 'pending')
  const totalEarnings = detections.filter(d => d.status === 'monetized').reduce((acc, d) => acc + (d.estimated_impressions / 1000) * d.estimated_cpm, 0)
  const totalImpressions = detections.reduce((acc, d) => acc + d.estimated_impressions, 0)

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-sm text-amber-800 text-center">
          Viewing sample data — connect your database to go live.
        </div>
      )}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Protection Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Real-time NIL monitoring across all platforms</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchDetections} disabled={loading}>
            {loading ? <Loader2 size={14} className="animate-spin mr-1.5" /> : <RefreshCw size={14} className="mr-1.5" />}
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Alerts', value: pending.length.toString(), icon: AlertTriangle, color: 'text-amber-500' },
            { label: 'Total Detections', value: detections.length.toString(), icon: Eye, color: 'text-indigo-500' },
            { label: 'NIL Earnings', value: formatCurrency(totalEarnings), icon: DollarSign, color: 'text-green-500' },
            { label: 'Total Impressions', value: new Intl.NumberFormat(undefined, { notation: 'compact' }).format(totalImpressions), icon: TrendingUp, color: 'text-blue-500' }
          ].map((metric) => (
            <Card key={metric.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{metric.label}</span>
                  <metric.icon size={16} className={metric.color} />
                </div>
                <p className="text-2xl font-bold">{loading ? <span className="inline-block w-16 h-6 bg-muted rounded animate-pulse" /> : metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            <AlertTriangle size={16} />
            {error}
            <Button variant="outline" size="sm" className="ml-auto" onClick={fetchDetections}>Retry</Button>
          </div>
        )}

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Detection Alerts</CardTitle>
              <Shield size={16} className="text-indigo-500" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="divide-y divide-border">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-4 flex items-center gap-4">
                    <div className="w-24 h-4 bg-muted rounded animate-pulse" />
                    <div className="w-16 h-4 bg-muted rounded animate-pulse" />
                    <div className="flex-1 h-4 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : detections.length === 0 ? (
              <div className="flex flex-col items-center py-16 px-6 text-center">
                <CheckCircle size={40} className="text-green-500 mb-4" />
                <h3 className="font-semibold mb-2">No detections yet</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>WEIR is scanning your platforms. New matches will appear here instantly.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {detections.map((d) => (
                  <div key={d.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 transition-colors hover:bg-muted/30">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full pulse-dot ${ d.risk_level === 'high' ? 'bg-red-500' : d.risk_level === 'medium' ? 'bg-amber-500' : 'bg-green-500' }`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{d.platform}</span>
                          <Badge className={`text-xs px-2 py-0.5 ${STATUS_CONFIG[d.status]?.color}`}>{STATUS_CONFIG[d.status]?.label}</Badge>
                        </div>
                        <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                          {d.match_confidence}% match &middot; {new Intl.NumberFormat(undefined, { notation: 'compact' }).format(d.estimated_impressions)} impressions &middot; {formatRelative(d.detected_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm font-semibold text-green-600">{formatCurrency((d.estimated_impressions / 1000) * d.estimated_cpm)}</span>
                      {d.status === 'pending' && (
                        <>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white h-8 px-3 text-xs" disabled={actionLoading === d.id + 'monetized'} onClick={() => handleAction(d.id, 'monetized')}>
                            {actionLoading === d.id + 'monetized' ? <Loader2 size={12} className="animate-spin" /> : <DollarSign size={12} className="mr-1" />}
                            Monetize
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 px-3 text-xs border-red-300 text-red-600 hover:bg-red-50" disabled={actionLoading === d.id + 'takedown'} onClick={() => handleAction(d.id, 'takedown')}>
                            {actionLoading === d.id + 'takedown' ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={12} className="mr-1" />}
                            Takedown
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 px-3 text-xs" disabled={actionLoading === d.id + 'approved'} onClick={() => handleAction(d.id, 'approved')}>
                            {actionLoading === d.id + 'approved' ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} className="mr-1" />}
                            Approve
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
