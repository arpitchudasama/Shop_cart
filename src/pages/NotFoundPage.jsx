import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 page-enter">
      <div className="text-center max-w-lg">
        <p className="font-display text-[10rem] font-light text-stone-100 leading-none select-none">
          404
        </p>
        <div className="-mt-8 relative z-10">
          <h1 className="font-display text-4xl font-light text-stone-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-stone-500 mb-10">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="btn-primary">
              Return Home
            </Link>
            <Link to="/products" className="btn-secondary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
