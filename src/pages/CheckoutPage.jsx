import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'
import { PageHeader } from '../components/common/UI'

const steps = ['Information', 'Shipping', 'Payment']

const CheckoutPage = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    address: '', city: '', zip: '', country: 'US', state: '',
    cardNumber: '', expiry: '', cvv: '', cardName: '',
    shipping: 'standard',
  })

  const shipping = form.shipping === 'express' ? 19.99 : totalPrice > 100 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 2) {
      setStep(s => s + 1)
    } else {
      setOrderPlaced(true)
      clearCart()
      setTimeout(() => navigate('/'), 4000)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-slide-up">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="font-display text-4xl font-light text-stone-900 mb-4">Order Confirmed!</h1>
          <p className="text-stone-500 mb-2">Thank you for your purchase.</p>
          <p className="text-stone-400 text-sm mb-8">A confirmation has been sent to {form.email}</p>
          <p className="text-xs text-stone-400">Redirecting you to the home page…</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl text-stone-900 mb-4">Your cart is empty</h2>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-light tracking-[0.2em] text-stone-900 uppercase">
           Shop Cart
          </Link>
          <div className="flex items-center gap-4">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 && <span className="text-stone-200">—</span>}
                <span
                  className={`text-xs tracking-widest uppercase transition-colors ${
                    i === step ? 'text-stone-900 font-medium' : i < step ? 'text-stone-400' : 'text-stone-300'
                  }`}
                >
                  {s}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">

            {/* Step 0: Contact + Address */}
            {step === 0 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-display text-2xl font-light text-stone-900 mb-6">Contact Information</h2>
                  <input name="email" type="email" placeholder="Email address" required value={form.email}
                    onChange={handleChange} className="input-field" />
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light text-stone-900 mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="firstName" placeholder="First name" required value={form.firstName} onChange={handleChange} className="input-field" />
                    <input name="lastName" placeholder="Last name" required value={form.lastName} onChange={handleChange} className="input-field" />
                  </div>
                  <div className="mt-4 space-y-4">
                    <input name="address" placeholder="Address" required value={form.address} onChange={handleChange} className="input-field" />
                    <div className="grid grid-cols-3 gap-4">
                      <input name="city" placeholder="City" required value={form.city} onChange={handleChange} className="input-field col-span-2" />
                      <input name="zip" placeholder="ZIP" required value={form.zip} onChange={handleChange} className="input-field" />
                    </div>
                    <select name="country" value={form.country} onChange={handleChange} className="input-field">
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Shipping Method */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="font-display text-2xl font-light text-stone-900 mb-6">Shipping Method</h2>
                <div className="space-y-3">
                  {[
                    { value: 'standard', label: 'Standard Shipping', desc: '5-7 business days', price: totalPrice > 100 ? 'Free' : '$9.99' },
                    { value: 'express', label: 'Express Shipping', desc: '2-3 business days', price: '$19.99' },
                  ].map(opt => (
                    <label key={opt.value} className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      form.shipping === opt.value ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-400'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.value}
                          checked={form.shipping === opt.value}
                          onChange={handleChange}
                          className="accent-stone-900"
                        />
                        <div>
                          <div className="text-sm font-medium text-stone-900">{opt.label}</div>
                          <div className="text-xs text-stone-400">{opt.desc}</div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-stone-900">{opt.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="font-display text-2xl font-light text-stone-900 mb-6">Payment</h2>
                <div className="space-y-4">
                  <input name="cardName" placeholder="Name on card" required value={form.cardName} onChange={handleChange} className="input-field" />
                  <input name="cardNumber" placeholder="Card number (1234 5678 9012 3456)" required value={form.cardNumber} onChange={handleChange} className="input-field" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="expiry" placeholder="MM / YY" required value={form.expiry} onChange={handleChange} className="input-field" />
                    <input name="cvv" placeholder="CVV" required value={form.cvv} onChange={handleChange} className="input-field" />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-stone-400">
                  <span>🔒</span>
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="flex items-center justify-between pt-4">
              {step > 0 ? (
                <button type="button" onClick={() => setStep(s => s - 1)} className="btn-ghost">
                  ← Back
                </button>
              ) : (
                <Link to="/cart" className="btn-ghost">← Return to Cart</Link>
              )}

              <button type="submit" className="btn-primary">
                {step === 2 ? `Place Order — ${formatPrice(grandTotal)}` : 'Continue →'}
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-stone-100 p-6 sticky top-24">
              <h3 className="font-display text-xl font-light text-stone-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-14 h-14 bg-stone-50 flex items-center justify-center p-2 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-stone-700 leading-snug truncate">{item.title}</p>
                    </div>
                    <span className="text-sm text-stone-900 font-medium flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span><span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Tax</span><span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-stone-900 font-medium pt-2 border-t border-stone-100">
                  <span>Total</span>
                  <span className="font-display text-lg">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
