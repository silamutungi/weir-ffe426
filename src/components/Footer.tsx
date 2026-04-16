import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-bold text-lg">WEIR</p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Protect your name, image, and likeness.</p>
        </div>
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <Link to="/pricing" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Pricing</Link>
          <Link to="/login" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Sign in</Link>
          <Link to="/signup" className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Sign up</Link>
        </nav>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          &copy; {new Date().getFullYear()} WEIR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
