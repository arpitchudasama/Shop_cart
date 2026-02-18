import React from 'react'

export const ProductCardSkeleton = () => (
  <div className="bg-white shadow-sm animate-pulse">
    <div className="aspect-square bg-stone-100 skeleton" />
    <div className="p-4 space-y-3">
      <div className="h-3 bg-stone-100 skeleton rounded w-3/4" />
      <div className="h-3 bg-stone-100 skeleton rounded w-1/2" />
      <div className="h-4 bg-stone-100 skeleton rounded w-1/3" />
    </div>
  </div>
)

export const ProductDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="aspect-square bg-stone-100 skeleton" />
      <div className="space-y-6">
        <div className="h-4 bg-stone-100 skeleton rounded w-1/4" />
        <div className="h-8 bg-stone-100 skeleton rounded w-3/4" />
        <div className="h-6 bg-stone-100 skeleton rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-3 bg-stone-100 skeleton rounded" />
          <div className="h-3 bg-stone-100 skeleton rounded" />
          <div className="h-3 bg-stone-100 skeleton rounded w-3/4" />
        </div>
        <div className="h-12 bg-stone-100 skeleton rounded" />
      </div>
    </div>
  </div>
)

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)
