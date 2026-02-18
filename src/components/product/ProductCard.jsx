import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPrice, truncateText, renderStars } from '../../utils/helpers'

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
)

const StarRating = ({ rating, count }) => {
  const stars = renderStars(rating)
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {stars.map((type, i) => (
          <span key={i} className={`text-xs ${type === 'empty' ? 'star-empty' : 'star-filled'}`}>
            {type === 'empty' ? '☆' : '★'}
          </span>
        ))}
      </div>
      <span className="text-xs text-stone-400">({count})</span>
    </div>
  )
}

const ProductCard = ({ product }) => {
  const { addToCart, items } = useCart()
  const [added, setAdded] = useState(false)

  const isInCart = items.some(i => i.id === product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-white card-shadow transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-stone-50 aspect-square">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-widest uppercase bg-white/90 text-stone-600 px-2 py-1">
            {product.category}
          </span>
        </div>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-medium transition-colors duration-200 ${
              added || isInCart
                ? 'bg-stone-700 text-white'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {added ? <><CheckIcon /> Added</> : <><CartIcon /> Add to Cart</>}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm text-stone-800 font-medium leading-snug mb-2 transition-colors group-hover:text-stone-600">
          {truncateText(product.title, 50)}
        </h3>

        <StarRating rating={product.rating.rate} count={product.rating.count} />

        <div className="flex items-center justify-between mt-3">
          <span className="font-display text-lg font-semibold text-stone-900">
            {formatPrice(product.price)}
          </span>
          {isInCart && (
            <span className="text-[10px] tracking-widest uppercase text-stone-400">In cart</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
