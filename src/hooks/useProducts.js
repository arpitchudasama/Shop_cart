import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

export const useProducts = (category = null) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const url = category
          ? `${BASE_URL}/products/category/${encodeURIComponent(category)}`
          : `${BASE_URL}/products`
        const { data } = await axios.get(url)
        setProducts(data)
      } catch (err) {
        setError('Failed to fetch products. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category])

  return { products, loading, error }
}

export const useProduct = (id) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data } = await axios.get(`${BASE_URL}/products/${id}`)
        setProduct(data)
      } catch (err) {
        setError('Product not found.')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  return { product, loading, error }
}

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${BASE_URL}/products/categories`)
      .then(({ data }) => setCategories(data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading }
}
