import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, Clock, Users, ChefHat, BookOpen, FileText, 
  ArrowRight, Flame, Star, Loader2, Utensils, TrendingUp
} from 'lucide-react'
import api from '../api/axios'

const placeholderImages = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop',
]

const categories = [
  { name: 'Semua', icon: Utensils, value: '' },
  { name: 'Resep', icon: ChefHat, value: 'recipe' },
  { name: 'Tutorial', icon: BookOpen, value: 'tutorial' },
  { name: 'Blog', icon: FileText, value: 'blog' },
]

function RecipeCard({ item, type, index }) {
  const img = placeholderImages[index % placeholderImages.length]
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/detail/${type}/${item._id || item.id}`} className="card group block">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image || img}
            alt={item.title || item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.src = img }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {item.category && (
            <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs 
                           font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              {item.category}
            </span>
          )}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            {item.cookTime && (
              <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm 
                           text-text-main text-xs font-medium px-2 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                {item.cookTime}
              </span>
            )}
            {item.servings && (
              <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm 
                           text-text-main text-xs font-medium px-2 py-1 rounded-full">
                <Users className="w-3 h-3" />
                {item.servings}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < (item.rating || 4) ? 'text-primary fill-primary' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <h3 className="font-display text-lg font-semibold text-text-main 
                       group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {item.title || item.name}
          </h3>
          <p className="text-sm text-text-light line-clamp-2 mb-3">
            {item.description || item.summary || 'Resep lezat untuk keluarga tercinta...'}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {item.author && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="text-secondary text-xs font-semibold">
                      {item.author.name?.charAt(0) || 'M'}
                    </span>
                  </div>
                  <span className="text-xs text-text-light">{item.author.name || 'Mama'}</span>
                </div>
              )}
            </div>
            <span className="text-primary text-sm font-medium flex items-center gap-1 
                          group-hover:gap-2 transition-all">
              Baca <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="card">
      <div className="h-48 animate-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 animate-shimmer rounded" />
        <div className="h-5 w-3/4 animate-shimmer rounded" />
        <div className="h-3 w-full animate-shimmer rounded" />
        <div className="h-3 w-2/3 animate-shimmer rounded" />
      </div>
    </div>
  )
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const activeCategory = searchParams.get('category') || ''

  useEffect(() => {
    fetchItems()
  }, [activeCategory])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const promises = []
      
      if (!activeCategory || activeCategory === 'recipe') {
        promises.push(
          api.get('/recipes', { params: { search } })
            .then(res => (res.data.recipes || []).map(r => ({ ...r, _type: 'recipe' })))
            .catch(() => [])
        )
      }
      if (!activeCategory || activeCategory === 'tutorial') {
        promises.push(
          api.get('/tutorials')
            .then(res => (res.data.tutorials || []).map(t => ({ ...t, _type: 'tutorial' })))
            .catch(() => [])
        )
      }
      if (!activeCategory || activeCategory === 'blog') {
        promises.push(
          api.get('/blogs', { params: { search } })
            .then(res => (res.data.blogs || []).map(b => ({ ...b, _type: 'blog' })))
            .catch(() => [])
        )
      }

      const results = await Promise.all(promises)
      const allItems = results.flat()
      setItems(allItems)
    } catch (err) {
      console.error('Fetch error:', err)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    setSearchParams(params)
    fetchItems()
  }

  const handleCategoryChange = (value) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-warm to-secondary/5">
        <div className="container-app py-16 md:py-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary 
                             text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Flame className="w-4 h-4" />
                Komunitas Masak RT/RW
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-text-main mb-4 leading-tight">
                Masak Lezat,{' '}
                <span className="text-primary">Berbagi</span>{' '}
                dengan{' '}
                <span className="text-secondary">Sesama</span>
              </h1>
              <p className="text-lg text-text-light mb-8 max-w-lg">
                Temukan resep masakan Nusantara, tutorial memasak, dan tips kuliner 
                  dari ibu-ibu terbaik di komunitas Anda.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-3 max-w-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light/50" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari resep, tutorial, atau tips..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-warm-dark 
                             focus:border-primary focus:ring-4 focus:ring-primary/10 
                             focus:outline-none transition-all bg-white text-text-main 
                             shadow-card"
                  />
                </div>
                <button type="submit" className="btn-primary !px-8 !rounded-2xl">
                  Cari
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-40 w-56 h-56 bg-secondary/5 rounded-full blur-3xl" />
      </section>

      {/* Stats */}
      <section className="container-app -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-card p-6 grid grid-cols-3 gap-4"
        >
          {[
            { icon: ChefHat, label: 'Resep', value: '200+', color: 'text-primary' },
            { icon: BookOpen, label: 'Tutorial', value: '50+', color: 'text-secondary' },
            { icon: TrendingUp, label: 'Komunitas', value: '1K+', color: 'text-primary' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-text-main">{stat.value}</p>
              <p className="text-sm text-text-light">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Categories */}
      <section className="container-app mt-12">
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium 
                        transition-all duration-200 ${
                activeCategory === cat.value
                  ? 'bg-primary text-white shadow-warm'
                  : 'bg-white text-text-main hover:bg-primary/10 hover:text-primary border border-warm-dark/30'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Content Grid */}
      <section className="container-app mt-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-main">
            {activeCategory === 'recipe' && 'Resep Masakan'}
            {activeCategory === 'tutorial' && 'Tutorial Memasak'}
            {activeCategory === 'blog' && 'Artikel & Blog'}
            {!activeCategory && 'Semua Konten'}
          </h2>
          <span className="text-sm text-text-light">
            {items.length} item ditemukan
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <RecipeCard
                key={item._id || item.id || index}
                item={item}
                type={item._type}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ChefHat className="w-16 h-16 text-text-light/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-text-main mb-2">
              Belum ada konten
            </h3>
            <p className="text-text-light">
              Konten akan segera tersedia. Nantikan resep dan tutorial terbaru!
            </p>
          </motion.div>
        )}
      </section>
    </div>
  )
}
