import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'

import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { cn } from '../lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/settings', label: 'Settings', icon: Settings }
]

export default function AppNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="App navigation">
        <Link to="/dashboard" className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>WEIR</Link>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                location.pathname === item.to
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted'
              )}
              aria-current={location.pathname === item.to ? 'page' : undefined}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors focus-ring ml-2"
            aria-label="Log out"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
        <button
          className="md:hidden p-2 rounded-lg focus-ring"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium',
                location.pathname === item.to ? 'bg-indigo-50 text-indigo-600' : 'text-foreground/70'
              )}
              onClick={() => setOpen(false)}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 focus-ring"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      )}
    </header>
  )
}
