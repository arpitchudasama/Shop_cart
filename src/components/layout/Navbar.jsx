import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
)

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
)

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
]

const Navbar = () => {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      }`}>
        {/* Top bar */}
        <div className="border-b border-stone-100 py-2 text-center text-xs tracking-widest text-stone-500 uppercase hidden md:block">
          Free shipping on orders over $100 — Shop Now
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu btn */}
            <button
              className="md:hidden text-stone-700"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </button>

            {/* Logo */}
            <Link to="/" className="font-display text-2xl tracking-[0.2em] text-stone-900 font-semibold uppercase">
              Shop Cart
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `text-sm tracking-widest uppercase transition-colors duration-200 ${
                      isActive ? 'text-stone-900 border-b border-stone-900' : 'text-stone-500 hover:text-stone-900'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-stone-600 hover:text-stone-900 transition-colors"
              >
                <SearchIcon />
              </button>

              {user ? (
                <div className="relative group">
                  <button className="text-stone-600 hover:text-stone-900 transition-colors">
                    <UserIcon />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-stone-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 text-xs text-stone-400 border-b border-stone-100">{user.email}</div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="text-stone-600 hover:text-stone-900 transition-colors">
                  <UserIcon />
                </Link>
              )}

              <Link to="/cart" className="relative text-stone-600 hover:text-stone-900 transition-colors">
                <CartIcon />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col animate-slide-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
              <span className="font-display text-xl tracking-widest uppercase">Menu</span>
              <button onClick={() => setMobileOpen(false)}><CloseIcon /></button>
            </div>
            <nav className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-stone-700 tracking-wide hover:text-stone-900"
                >
                  {label}
                </Link>
              ))}
              {!user && (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-lg text-stone-700 tracking-wide hover:text-stone-900">
                  Sign In
                </Link>
              )}
              {user && (
                <button onClick={() => { logout(); setMobileOpen(false) }} className="text-left text-lg text-stone-700 tracking-wide hover:text-stone-900">
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white/98 backdrop-blur-sm flex items-start pt-32 px-4">
          <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex items-center border-b-2 border-stone-900 pb-4">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for products…"
                className="flex-1 text-2xl font-display font-light bg-transparent outline-none text-stone-900 placeholder-stone-300"
              />
              <button type="submit" className="text-stone-600 hover:text-stone-900 ml-4">
                <SearchIcon />
              </button>
            </form>
            <button
              onClick={() => setSearchOpen(false)}
              className="mt-6 text-sm text-stone-400 tracking-widest uppercase hover:text-stone-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}

export default Navbar
