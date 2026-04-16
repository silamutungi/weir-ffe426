import { useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const features = [
  { icon: Eye, title: 'Real-Time Content Matching', desc: 'AI scans TikTok, Instagram, YouTube, and ad networks 24/7. Get alerted the moment your likeness appears without authorization.' },
  { icon: Zap, title: 'One-Tap Action Workflows', desc: 'Monetize, request takedown, or approve in under 5 seconds. No forms to fill, no lawyers to call for standard cases.' },
  { icon: DollarSign, title: 'CPM Earnings Attribution', desc: 'See exactly how much revenue your image generated for others. Know your worth before negotiating any license deal.' },
  { icon: FileText, title: 'Platform Licensing Templates', desc: 'Pre-built licensing terms for every major platform. Customize rates, usage types, and duration in one click.' },
  { icon: Scale, title: 'Dispute Resolution', desc: 'Contested a match? WEIR manages the dispute workflow with timestamped evidence and structured escalation paths.' },
  { icon: Shield, title: 'Visual Recognition Engine', desc: 'Custom-trained models that recognize your face, logo, and distinctive traits across stills, video frames, and ad creatives.' }
]

const plans = [
  { name: 'Free', price: 0, features: ['5 alerts/month', '2 platforms monitored', 'Manual takedown requests', 'Basic dashboard'], highlight: false },
  { name: 'Creator', price: 29, features: ['Unlimited alerts', 'All 6 platforms', 'One-tap actions', 'CPM earnings tracking', 'License templates'], highlight: true },
  { name: 'Pro', price: 79, features: ['Everything in Creator', 'Custom AI model training', 'Dispute resolution suite', 'Priority support', 'API access', 'White-label reports'], highlight: false }
]

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1758876204244-9014956c004d?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwY29uZmlkZW50JTIwY3JlYXRvciUyMHNpdHRpbmclMjBhdCUyMGElMjBtb2Rlcm4lMjBkZXNrJTIwd2l0aCUyMG11bHRpcGxlJTIwZ3xlbnwwfDB8fHwxNzc2MzE3NDMxfDA&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <Badge className="mb-6 bg-indigo-500/20 text-indigo-200 border-indigo-500/30 text-sm">AI-Powered NIL Protection</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6 max-w-3xl">
            Stop losing money to unauthorized use of your likeness.
          </h1>
          <p className="text-xl text-slate-200 mb-10 max-w-xl leading-relaxed">
            WEIR detects your name, image, and likeness across every major platform in real time — then puts the action in your hands in under 5 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 text-base" onClick={() => navigate('/signup')}>
              Start free
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-gray-900/10 px-8 py-4 text-base" onClick={() => navigate('/pricing')}>
              See pricing
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-400">Free plan available. No credit card required.</p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Every tool you need to own your NIL.</h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>Detection, enforcement, and monetization in one platform.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6 transition-transform duration-200 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-indigo-500" strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-muted/30" id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing.</h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>No hidden fees. No subscription traps. Cancel any time.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-xl border p-8 flex flex-col ${ plan.highlight ? 'border-indigo-500 bg-indigo-500/5 ring-2 ring-indigo-500/30' : 'border-border bg-card' }`}>
                {plan.highlight && <Badge className="self-start mb-4 bg-indigo-500 text-white text-xs">Most popular</Badge>}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6">{plan.price === 0 ? 'Free' : `$${plan.price}`}<span className="text-sm font-normal" style={{ color: 'var(--color-text-secondary)' }}>{plan.price > 0 ? '/mo' : ''}</span></p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 font-bold mt-0.5">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlight ? 'default' : 'outline'} className={plan.highlight ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : ''} onClick={() => navigate('/signup')}>
                  Get started free
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
