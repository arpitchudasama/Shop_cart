import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-display text-2xl font-light tracking-[0.2em] text-white uppercase">
              Shop Cart
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Curated collections for the discerning individual. Quality above all else.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-6">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/products?category=men's clothing" className="hover:text-white transition-colors">Men</Link></li>
              <li><Link to="/products?category=women's clothing" className="hover:text-white transition-colors">Women</Link></li>
              <li><Link to="/products?category=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=jewelery" className="hover:text-white transition-colors">Jewelry</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-6">Help</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for exclusive offers and new arrivals.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-stone-900 border border-stone-800 px-4 py-2 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-stone-600"
              />
              <button className="bg-white text-stone-900 px-4 py-2 text-xs tracking-widest uppercase font-medium hover:bg-stone-100 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs">
          <p>© {new Date().getFullYear()} Shop Cart. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
