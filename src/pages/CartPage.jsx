import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'
import { EmptyState, PageHeader } from '../components/common/UI'

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
)

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex gap-6 py-6 border-b border-stone-100">
      {/* Image */}
      <Link to={`/products/${item.id}`} className="flex-shrink-0">
        <div className="w-24 h-24 bg-stone-50 flex items-center justify-center p-3">
          <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.id}`}>
          <h3 className="text-sm text-stone-900 font-medium hover:text-stone-600 transition-colors leading-snug mb-1">
            {item.title}
          </h3>
        </Link>
        <p className="text-xs text-stone-400 capitalize mb-3">{item.category}</p>

        <div className="flex items-center justify-between">
          {/* Quantity control */}
          <div className="flex items-center border border-stone-200">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-sm transition-colors"
            >
              −
            </button>
            <span className="px-4 py-1.5 text-stone-900 text-sm border-x border-stone-200 min-w-[2.5rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-sm transition-colors"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-display text-lg font-semibold text-stone-900">
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-stone-300 hover:text-red-400 transition-colors"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const CartPage = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart()

  const shipping = totalPrice > 100 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: `Cart (${totalItems})` },
  ]

  if (items.length === 0) {
    return (
      <div className="page-enter">
        <PageHeader title="Your Cart" breadcrumbs={breadcrumbs} />
        <EmptyState
          title="Your cart is empty"
          message="Looks like you haven't added anything yet. Start shopping to fill it up."
          action={{ label: 'Start Shopping', href: '/products' }}
        />
      </div>
    )
  }

  return (
    <div className="page-enter">
      <PageHeader title={`Your Cart (${totalItems})`} breadcrumbs={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm tracking-widest uppercase text-stone-600">{totalItems} Items</h2>
              <button
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-red-400 tracking-wide uppercase transition-colors"
              >
                Remove All
              </button>
            </div>

            <div>
              {items.map(item => <CartItem key={item.id} item={item} />)}
            </div>

            <div className="mt-8">
              <Link to="/products" className="text-sm text-stone-500 hover:text-stone-900 tracking-wide flex items-center gap-2 transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-stone-50 p-8 sticky top-24">
              <h2 className="font-display text-2xl font-light text-stone-900 mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-stone-400 bg-stone-100 px-3 py-2 rounded">
                    Add {formatPrice(100 - totalPrice)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-stone-200 pt-4 mb-6">
                <div className="flex justify-between text-stone-900">
                  <span className="font-medium">Total</span>
                  <span className="font-display text-xl font-semibold">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Promo code */}
              <div className="flex mb-6">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 border border-stone-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                />
                <button className="bg-stone-900 text-white px-4 py-2 text-xs tracking-widest uppercase hover:bg-stone-700 transition-colors">
                  Apply
                </button>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center btn-primary text-sm py-4"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-6 flex justify-center gap-6">
                {['visa', 'mc', 'amex', 'paypal'].map(c => (
                  <span key={c} className="text-xs text-stone-300 uppercase tracking-widest">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
