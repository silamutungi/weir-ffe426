import { useNavigate } from 'react-router-dom'
import { Check, HelpCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started with basic monitoring.',
    features: ['5 detection alerts per month', '2 platforms monitored', 'Manual takedown requests', 'Basic analytics dashboard', 'Email support'],
    cta: 'Start free',
    highlight: false
  },
  {
    name: 'Creator',
    price: 29,
    description: 'For creators who take NIL seriously.',
    features: ['Unlimited detection alerts', 'All 6 platforms monitored', 'One-tap monetize / takedown / approve', 'CPM earnings attribution', 'Licensing template library', 'Priority email support'],
    cta: 'Start free trial',
    highlight: true
  },
  {
    name: 'Pro',
    price: 79,
    description: 'For athletes and agencies at scale.',
    features: ['Everything in Creator', 'Custom AI model training', 'Dispute resolution workflow', 'API access & webhooks', 'White-label PDF reports', 'Dedicated account manager'],
    cta: 'Start free trial',
    highlight: false
  }
]

const faqs = [
  { q: 'How does the free plan work?', a: 'You get 5 detection alerts per month across 2 platforms with no credit card required. Upgrade when you need more coverage.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Yes. Cancel from your account settings at any time. You keep access until the end of your billing period.' },
  { q: 'What platforms does WEIR scan?', a: 'TikTok, Instagram, YouTube, Meta Ads, Google Ads, and Twitter. Pro users can request additional platforms.' },
  { q: 'How accurate is the matching engine?', a: 'Our visual recognition model achieves 94%+ precision across face, logo, and likeness detection on tested datasets.' },
  { q: 'How long does a takedown request take?', a: 'Standard requests are submitted within seconds. Platform processing times vary (typically 24-72 hours).' }
]

export default function Pricing() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing that scales with your NIL.</h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>Start free. No credit card required. Upgrade when your coverage needs grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {plans.map((plan) => (
              <Card key={plan.name} className={`flex flex-col ${ plan.highlight ? 'border-indigo-500 ring-2 ring-indigo-500/30' : '' }`}>
                <CardHeader className="pb-4">
                  {plan.highlight && <Badge className="self-start mb-3 bg-indigo-500 text-white text-xs">Most popular</Badge>}
                  <h2 className="text-xl font-bold">{plan.name}</h2>
                  <p className="text-3xl font-bold mt-1">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                    {plan.price > 0 && <span className="text-sm font-normal" style={{ color: 'var(--color-text-secondary)' }}>/month</span>}
                  </p>
                  <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>{plan.description}</p>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={plan.highlight ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : ''}
                    variant={plan.highlight ? 'default' : 'outline'}
                    onClick={() => navigate('/signup')}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle size={18} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
