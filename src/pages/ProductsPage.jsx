import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import { ProductGridSkeleton } from '../components/skeleton/Skeletons'
import { ErrorMessage, PageHeader } from '../components/common/UI'
import { useProducts, useCategories } from '../hooks/useProducts'
import { sortProducts } from '../utils/helpers'

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
  </svg>
)

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Alphabetical' },
]

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [filtersOpen, setFiltersOpen] = useState(false)

  const currentCategory = searchParams.get('category') || ''
  const searchQuery = searchParams.get('search') || ''

  const { products, loading, error } = useProducts()
  const { categories } = useCategories()

  const filteredAndSorted = useMemo(() => {
    let result = [...products]

    // Category filter
    if (currentCategory) {
      result = result.filter(p => p.category === currentCategory)
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    return sortProducts(result, sortBy)
  }, [products, currentCategory, searchQuery, sortBy, priceRange])

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams)
    if (cat) params.set('category', cat)
    else params.delete('category')
    params.delete('search')
    setSearchParams(params)
  }

  const resetFilters = () => {
    setSearchParams({})
    setSortBy('default')
    setPriceRange([0, 1000])
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: currentCategory || (searchQuery ? `Search: "${searchQuery}"` : 'All Products') },
  ]

  return (
    <div className="page-enter">
      <PageHeader title={currentCategory || (searchQuery ? `"${searchQuery}"` : 'All Products')} breadcrumbs={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 text-sm tracking-wide text-stone-600 hover:text-stone-900 border border-stone-200 px-4 py-2 transition-colors hover:border-stone-900"
            >
              <FilterIcon /> Filters
            </button>
            {(currentCategory || searchQuery || priceRange[1] < 1000) && (
              <button onClick={resetFilters} className="text-xs text-stone-400 hover:text-stone-700 tracking-wide uppercase">
                Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-400">{filteredAndSorted.length} products</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-sm border border-stone-200 bg-white px-3 py-2 text-stone-700 focus:outline-none focus:border-stone-900 cursor-pointer"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block w-56 flex-shrink-0`}>
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xs tracking-widest uppercase text-stone-900 mb-4 font-medium">Category</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setCategory('')}
                    className={`text-sm transition-colors ${!currentCategory ? 'text-stone-900 font-medium' : 'text-stone-400 hover:text-stone-700'}`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => setCategory(cat)}
                      className={`text-sm capitalize transition-colors ${currentCategory === cat ? 'text-stone-900 font-medium' : 'text-stone-400 hover:text-stone-700'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="text-xs tracking-widest uppercase text-stone-900 mb-4 font-medium">
                Price: ${priceRange[0]} — ${priceRange[1]}
              </h3>
              <input
                type="range"
                min={0}
                max={1000}
                step={10}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                className="w-full accent-stone-900"
              />
            </div>

            {/* Rating filter could go here */}
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {loading ? (
              <ProductGridSkeleton count={8} />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : filteredAndSorted.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-4xl mb-4">🔍</div>
                <h2 className="font-display text-2xl text-stone-800 mb-2">No products found</h2>
                <p className="text-stone-400 mb-6">Try adjusting your filters or search query</p>
                <button onClick={resetFilters} className="btn-secondary">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredAndSorted.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
