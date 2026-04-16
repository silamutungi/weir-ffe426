export type AlertStatus = 'pending' | 'approved' | 'takedown' | 'monetized' | 'disputed'

export type Platform = 'TikTok' | 'Instagram' | 'YouTube' | 'Meta Ads' | 'Google Ads' | 'Twitter'

export type RiskLevel = 'high' | 'medium' | 'low'

export interface Detection {
  id: string
  user_id: string
  platform: Platform
  content_url: string
  thumbnail_url: string
  match_confidence: number
  risk_level: RiskLevel
  status: AlertStatus
  estimated_cpm: number
  estimated_impressions: number
  detected_at: string
  resolved_at: string | null
  notes: string | null
  deleted_at: string | null
  created_at: string
}

export interface Profile {
  id: string
  user_id: string
  full_name: string
  display_name: string
  avatar_url: string | null
  social_handles: Record<string, string>
  plan: 'free' | 'creator' | 'pro'
  monthly_earnings: number
  total_protected: number
  created_at: string
  deleted_at: string | null
}

export interface LicenseTemplate {
  id: string
  user_id: string
  name: string
  platform: Platform
  usage_type: string
  rate_per_1k_impressions: number
  terms: string
  is_active: boolean
  created_at: string
  deleted_at: string | null
}
