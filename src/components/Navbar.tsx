import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'

export default function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="text-xl font-bold text-white" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>WEIR</Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/pricing" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Pricing</Link>
          <Link to="/login" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Sign in</Link>
          <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => navigate('/signup')}>Start free</Button>
        </div>
        <button
          className="md:hidden text-white p-2 rounded-lg focus-ring"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden glass border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <Link to="/pricing" className="text-sm font-medium text-white/80" onClick={() => setOpen(false)}>Pricing</Link>
          <Link to="/login" className="text-sm font-medium text-white/80" onClick={() => setOpen(false)}>Sign in</Link>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => { navigate('/signup'); setOpen(false) }}>Start free</Button>
        </div>
      )}
    </header>
  )
}
