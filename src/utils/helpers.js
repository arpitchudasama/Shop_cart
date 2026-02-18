export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)

export const truncateText = (text, maxLength = 60) =>
  text.length > maxLength ? text.slice(0, maxLength) + '…' : text

export const renderStars = (rating) => {
  const stars = []
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push('full')
    else if (i === full && half) stars.push('half')
    else stars.push('empty')
  }
  return stars
}

export const sortProducts = (products, sortBy) => {
  const sorted = [...products]
  switch (sortBy) {
    case 'price-asc': return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc': return sorted.sort((a, b) => b.price - a.price)
    case 'rating': return sorted.sort((a, b) => b.rating.rate - a.rating.rate)
    case 'name': return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default: return sorted
  }
}
