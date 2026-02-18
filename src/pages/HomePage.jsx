import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import { ProductGridSkeleton } from '../components/skeleton/Skeletons'
import { SectionHeader, ErrorMessage } from '../components/common/UI'
import { useProducts } from '../hooks/useProducts'

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
)

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-stone-950">
      {/* Decorative */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-stone-800/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(212,168,83,0.08),transparent_60%)]" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl py-24">
          <p className="text-xs tracking-[0.4em] uppercase text-gold-400 mb-8 animate-fade-in">
            New Season Collection
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.95] mb-8 animate-slide-up">
            Curated
            <br />
            <em className="text-stone-400">for the</em>
            <br />
            Discerning
          </h1>

          <p className="text-stone-400 text-lg font-light leading-relaxed mb-12 max-w-md animate-slide-up"
            style={{ animationDelay: '0.1s' }}>
            Discover our handpicked selection of premium products — where quality meets refinement.
          </p>

          <div className="flex flex-wrap items-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/products" className="btn-primary flex items-center gap-3">
              Shop Now <ArrowIcon />
            </Link>
            <Link to="/products?category=jewelery" className="text-stone-400 text-sm tracking-widest uppercase hover:text-white transition-colors border-b border-stone-700 pb-0.5">
              View Jewelry
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[['200+', 'Products'], ['4.8★', 'Avg. Rating'], ['Free', 'Returns']].map(([val, label]) => (
              <div key={label}>
                <div className="font-display text-2xl text-white font-light">{val}</div>
                <div className="text-xs text-stone-500 tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling categories */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-stone-800/50 overflow-hidden">
        <div className="flex gap-12 py-4 text-stone-600 text-xs tracking-widest uppercase whitespace-nowrap animate-pulse">
          {['Electronics', 'Jewelry', "Men's Clothing", "Women's Clothing", 'Accessories', 'Premium'].map(c => (
            <span key={c} className="flex items-center gap-4">
              {c} <span className="text-stone-700">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

const CategoryGrid = () => {
  const categories = [
    { name: "Electronics", slug: "electronics", emoji: "⚡", description: "Tech & Gadgets" },
    { name: "Jewelry", slug: "jewelery", emoji: "💎", description: "Fine Accessories" },
    { name: "Men's Fashion", slug: "men's clothing", emoji: "👔", description: "Refined Looks" },
    { name: "Women's Fashion", slug: "women's clothing", emoji: "✨", description: "Elegant Styles" },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeader
        eyebrow="Browse"
        title="Shop by Category"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            to={`/products?category=${encodeURIComponent(cat.slug)}`}
            className="group relative bg-stone-900 text-white p-8 flex flex-col justify-between min-h-[180px] overflow-hidden
                       hover:bg-stone-800 transition-colors duration-300"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="text-3xl">{cat.emoji}</div>
            <div>
              <div className="font-display text-xl font-light">{cat.name}</div>
              <div className="text-stone-400 text-xs mt-1 group-hover:text-stone-300 transition-colors">
                {cat.description}
              </div>
            </div>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowIcon />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

const FeaturedProducts = () => {
  const { products, loading, error } = useProducts()
  const featured = products.slice(0, 8)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">Hand-picked</p>
          <h2 className="section-title">Featured Products</h2>
        </div>
        <Link to="/products" className="text-sm tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2">
          All Products <ArrowIcon />
        </Link>
      </div>

      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  )
}

const PromoSection = () => (
  <section className="bg-stone-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: '🚚', title: 'Free Shipping', desc: 'On all orders over $100' },
          { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free returns' },
          { icon: '🔒', title: 'Secure Payment', desc: 'Your data is protected' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="text-center py-8">
            <div className="text-3xl mb-4">{icon}</div>
            <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">{title}</h3>
            <p className="text-stone-500 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const HomePage = () => {
  return (
    <div className="page-enter">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoSection />
    </div>
  )
}

export default HomePage
