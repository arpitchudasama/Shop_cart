import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct, useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { formatPrice, renderStars, truncateText } from '../utils/helpers'
import { ProductDetailSkeleton } from '../components/skeleton/Skeletons'
import { ErrorMessage, PageHeader } from '../components/common/UI'
import ProductCard from '../components/product/ProductCard'

const ProductDetailPage = () => {
  const { id } = useParams()
  const { product, loading, error } = useProduct(id)
  const { products } = useProducts()
  const { addToCart, items } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  if (loading) return <ProductDetailSkeleton />
  if (error) return <ErrorMessage message={error} />
  if (!product) return null

  const isInCart = items.some(i => i.id === product.id)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const stars = renderStars(product.rating.rate)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
    { label: truncateText(product.title, 30) },
  ]

  return (
    <div className="page-enter">
      <PageHeader title="" breadcrumbs={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-stone-50 aspect-square flex items-center justify-center p-12">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex gap-3 mt-4">
                {/* Thumbnail strip (same image for demo) */}
                {[product.image, product.image, product.image].map((img, i) => (
                  <div key={i} className="w-20 h-20 bg-stone-50 border-2 border-stone-200 flex items-center justify-center p-2 cursor-pointer hover:border-stone-900 transition-colors">
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl font-light text-stone-900 leading-tight mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {stars.map((type, i) => (
                  <span key={i} className={`text-sm ${type === 'empty' ? 'star-empty' : 'star-filled'}`}>
                    {type === 'empty' ? '☆' : '★'}
                  </span>
                ))}
              </div>
              <span className="text-sm text-stone-500">{product.rating.rate} ({product.rating.count} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-4xl font-light text-stone-900">{formatPrice(product.price)}</span>
              <span className="text-sm text-stone-400 line-through">{formatPrice(product.price * 1.2)}</span>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 tracking-wide">Save 17%</span>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-xs tracking-widest uppercase text-stone-600 mb-3 block">Quantity</label>
              <div className="flex items-center border border-stone-200 w-fit">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-3 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-3 text-stone-900 min-w-[3rem] text-center border-x border-stone-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-3 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 ${
                  added
                    ? 'bg-green-700 text-white'
                    : 'bg-stone-900 text-white hover:bg-stone-700'
                }`}
              >
                {added ? '✓ Added to Cart' : isInCart ? 'Add More' : 'Add to Cart'}
              </button>

              <Link to="/cart" className="border border-stone-900 text-stone-900 px-6 py-4 text-sm tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-all duration-300">
                View Cart
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col gap-3 border-t border-stone-100 pt-6 mb-8">
              {[
                { icon: '🚚', text: 'Free shipping on orders over $100' },
                { icon: '↩️', text: '30-day hassle-free returns' },
                { icon: '🔒', text: 'Secure checkout with SSL encryption' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-stone-500">
                  <span>{icon}</span> {text}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div>
              <div className="flex border-b border-stone-100 mb-6">
                {['description', 'details', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-xs tracking-widest uppercase transition-colors ${
                      activeTab === tab
                        ? 'text-stone-900 border-b-2 border-stone-900'
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'description' && (
                <p className="text-stone-600 text-sm leading-relaxed">{product.description}</p>
              )}
              {activeTab === 'details' && (
                <dl className="space-y-3 text-sm">
                  <div className="flex gap-4">
                    <dt className="w-24 text-stone-400 tracking-wide">Category</dt>
                    <dd className="text-stone-700 capitalize">{product.category}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="w-24 text-stone-400 tracking-wide">ID</dt>
                    <dd className="text-stone-700">#{product.id}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="w-24 text-stone-400 tracking-wide">Rating</dt>
                    <dd className="text-stone-700">{product.rating.rate}/5 ({product.rating.count} reviews)</dd>
                  </div>
                </dl>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {[
                    { name: 'Sarah M.', rating: 5, text: 'Absolutely love this product. Exactly as described and shipped quickly.', date: '2 weeks ago' },
                    { name: 'James K.', rating: 4, text: 'Great quality for the price. Would recommend.', date: '1 month ago' },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-stone-100 pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-stone-900">{review.name}</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <span key={j} className={`text-xs ${j < review.rating ? 'star-filled' : 'star-empty'}`}>
                              {j < review.rating ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-stone-400">{review.date}</span>
                      </div>
                      <p className="text-sm text-stone-600">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-3xl font-light text-stone-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailPage
