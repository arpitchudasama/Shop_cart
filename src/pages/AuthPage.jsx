import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AuthPage = () => {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate API call
    await new Promise(r => setTimeout(r, 800))

    if (mode === 'register') {
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters')
        setLoading(false)
        return
      }
    }

    // Mock auth - in production, call your API
    login({ name: form.name || form.email.split('@')[0], email: form.email })
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-stone-950 relative overflow-hidden flex-col justify-between p-16">
        <Link to="/" className="font-display text-2xl font-light tracking-[0.2em] text-white uppercase">
          Shop Cart
        </Link>

        <div>
          <blockquote className="font-display text-3xl font-light text-white leading-relaxed mb-6">
            "Style is a way to say who you are without having to speak."
          </blockquote>
          <cite className="text-stone-500 text-sm not-italic">— Rachel Zoe</cite>
        </div>

        <p className="text-stone-600 text-xs tracking-widest uppercase">
          Premium Shopping Experience
        </p>

        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-stone-800/50 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-16">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden block font-display text-2xl font-light tracking-[0.2em] text-stone-900 uppercase mb-10 text-center">
            LUXE
          </Link>

          <h1 className="font-display text-3xl font-light text-stone-900 mb-2">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-stone-400 text-sm mb-8">
            {mode === 'login'
              ? 'Sign in to continue to your account.'
              : 'Join us and start shopping today.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone-600 mb-2">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required={mode === 'register'}
                  className="input-field"
                />
              </div>
            )}

            <div>
              <label className="block text-xs tracking-widest uppercase text-stone-600 mb-2">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs tracking-widest uppercase text-stone-600">Password</label>
                {mode === 'login' && (
                  <a href="#" className="text-xs text-stone-400 hover:text-stone-700 transition-colors">
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone-600 mb-2">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{mode === 'login' ? 'Signing in…' : 'Creating account…'}</span>
                </>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-1 border-stone-200" />
            <span className="text-xs text-stone-400">or</span>
            <hr className="flex-1 border-stone-200" />
          </div>

          {/* Social (demo) */}
          <button className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-700 flex items-center justify-center gap-3 hover:bg-stone-50 transition-colors">
            <span>G</span>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-stone-500">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
              className="text-stone-900 font-medium hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
