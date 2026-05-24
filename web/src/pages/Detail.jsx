import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Clock, Users, Star, ChefHat, BookOpen, FileText,
  Share2, Heart, Printer, Loader2, Calendar, Tag, ChevronRight
} from 'lucide-react'
import api from '../api/axios'

const placeholderImg = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop'

const typeConfig = {
  recipe: { icon: ChefHat, label: 'Resep', color: 'primary' },
  tutorial: { icon: BookOpen, label: 'Tutorial', color: 'secondary' },
  blog: { icon: FileText, label: 'Blog', color: 'primary' },
}

const sampleIngredients = [
  '500g ayam potong',
  '3 lembar daun jeruk',
  '2 cm jahe, memarkan',
  '5 buah cabai merah',
  '3 siung bawang putih',
  '2 buah tomat',
  'Garam secukupnya',
  'Minyak goreng',
]

const sampleSteps = [
  'Bersihkan ayam dan potong menjadi beberapa bagian. Lumuri dengan garam dan perasan jeruk nipis.',
  'Haluskan bawang merah, bawang putih, cabai, dan jahe. Tumis hingga harum.',
  'Masukkan potongan ayam ke dalam tumisan bumbu. Aduk rata hingga ayam berubah warna.',
  'Tambahkan air secukupnya, masak dengan api kecil selama 30 menit hingga ayam empuk.',
  'Masukkan tomat dan daun jeruk. Masak hingga kuah mengental dan bumbu meresap.',
  'Koreksi rasa, sajikan hangat dengan nasi putih dan lalapan segar.',
]

export default function Detail() {
  const { type, id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [liked, setLiked] = useState(false)
  const config = typeConfig[type] || typeConfig.recipe

  useEffect(() => {
    fetchDetail()
  }, [type, id])

  const fetchDetail = async () => {
    setLoading(true)
    setError(null)
    try {
      const endpoint = type === 'recipe' ? 'recipes'
        : type === 'tutorial' ? 'tutorials'
        : 'blogs'
      const res = await api.get(`/${endpoint}/${id}`)
      setItem(res.data.recipe || res.data.tutorial || res.data.blog || res.data)
    } catch (err) {
      setError('Gagal memuat data. Silakan coba lagi.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container-app py-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-light">Memuat konten...</p>
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="container-app py-20 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-text-light/30 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-text-main mb-2">
            Konten Tidak Ditemukan
          </h2>
          <p className="text-text-light mb-6">{error || 'Konten yang Anda cari tidak tersedia.'}</p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  const title = item.title || item.name || 'Judul Konten'
  const description = item.description || item.summary || ''
  const image = item.image || placeholderImg
  const author = item.author?.name || item.author || 'Dapur Mama'
  // Normalize ingredients: API returns [{name, amount}], component expects display text
  const rawIngredients = item.ingredients || sampleIngredients
  const ingredients = rawIngredients.map(ing =>
    typeof ing === 'string' ? ing : `${ing.name} ${ing.amount || ''}`.trim()
  )
  // Normalize steps: API returns [{step, description}], component expects strings
  const rawSteps = item.steps || item.instructions || sampleSteps
  const steps = rawSteps.map(s =>
    typeof s === 'string' ? s : s.description || String(s)
  )
  const tags = item.tags || ['masak', 'resepnusantara', 'homecooking']

  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <div className="container-app mt-6">
        <nav className="flex items-center gap-2 text-sm text-text-light">
          <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
          <ChevronRight className="w-4 h-4" />
          <span className={`${config.color === 'primary' ? 'text-primary' : 'text-secondary'} font-medium`}>
            {config.label}
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-main truncate max-w-[200px]">{title}</span>
        </nav>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-app mt-6"
      >
        <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[450px]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = placeholderImg }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Overlay info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className={`inline-flex items-center gap-1.5 bg-${config.color} text-white text-xs 
                           font-semibold px-3 py-1.5 rounded-full mb-3`}>
              <config.icon className="w-3.5 h-3.5" />
              {config.label}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(item.createdAt || Date.now()).toLocaleDateString('id-ID', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <ChefHat className="w-4 h-4" />
                {author}
              </span>
              {item.cookTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {item.cookTime}
                </span>
              )}
              {item.servings && (
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {item.servings} porsi
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center 
                        transition-all ${liked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-white' : ''}`} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white 
                             hover:bg-white/30 flex items-center justify-center transition-all">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white 
                             hover:bg-white/30 flex items-center justify-center transition-all">
              <Printer className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container-app mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 mb-6">
              <h2 className="font-display text-xl font-semibold text-text-main mb-4">
                Tentang {config.label}
              </h2>
              <p className="text-text-light leading-relaxed">
                {description || `Ini adalah ${config.label.toLowerCase()} yang dibuat dengan penuh cinta untuk komunitas Dapur Mama. Resep ini sudah teruji dan dijamin lezat untuk keluarga tercinta.`}
              </p>
            </div>

            {/* Ingredients (for recipes/tutorials) */}
            {(type === 'recipe' || type === 'tutorial') && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 mb-6">
                <h2 className="font-display text-xl font-semibold text-text-main mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ChefHat className="w-4 h-4 text-primary" />
                  </span>
                  Bahan-bahan
                </h2>
                <ul className="space-y-3">
                  {ingredients.map((ingredient, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-start gap-3 group"
                    >
                      <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center 
                                     justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary 
                                     group-hover:text-white transition-all">
                        <span className="text-xs font-semibold text-primary group-hover:text-white">
                          {i + 1}
                        </span>
                      </span>
                      <span className="text-text-light group-hover:text-text-main transition-colors">
                        {ingredient}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps (for recipes/tutorials) */}
            {(type === 'recipe' || type === 'tutorial') && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 mb-6">
                <h2 className="font-display text-xl font-semibold text-text-main mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-secondary" />
                  </span>
                  Langkah-langkah
                </h2>
                <div className="space-y-6">
                  {steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center 
                                     justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">{i + 1}</span>
                        </div>
                        {i < steps.length - 1 && (
                          <div className="w-0.5 flex-1 bg-secondary/20 mt-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="text-text-main leading-relaxed">
                          {step}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Content */}
            {type === 'blog' && (
              <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 mb-6">
                <h2 className="font-display text-xl font-semibold text-text-main mb-4">
                  Isi Artikel
                </h2>
                <div className="text-text-light leading-relaxed space-y-4">
                  <p>{description || 'Artikel ini membahas tips dan trik memasak untuk pemula.'}</p>
                  <p>
                    Memasak adalah salah satu kegiatan yang menyenangkan bagi para ibu di komunitas. 
                    Dengan berbagi resep dan pengalaman, kita bisa belajar bersama dan menghasilkan 
                    masakan yang lezat untuk keluarga tercinta.
                  </p>
                  <p>
                    Jangan ragu untuk bereksperimen dengan bahan dan bumbu yang berbeda. 
                    Setiap masakan memiliki cerita dan keunikan tersendiri.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Author Card */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-display text-lg font-semibold text-text-main mb-4">
                Dibuat oleh
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {typeof author === 'string' ? author.charAt(0) : 'M'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-text-main">{author}</p>
                  <p className="text-sm text-text-light">Anggota Komunitas</p>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-display text-lg font-semibold text-text-main mb-4">
                Penilaian
              </h3>
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 cursor-pointer transition-colors ${
                      i < (item.rating || 4)
                        ? 'text-primary fill-primary'
                        : 'text-gray-300 hover:text-primary/50'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-text-light">
                {item.rating || 4}.0 dari 5 • {item.reviews || 12} penilaian
              </p>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-display text-lg font-semibold text-text-main mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-warm text-text-light text-sm px-3 py-1.5 rounded-full 
                             hover:bg-primary/10 hover:text-primary cursor-pointer transition-all"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            {(type === 'recipe' || type === 'tutorial') && (
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h3 className="font-display text-lg font-semibold text-text-main mb-4">
                  Info Cepat
                </h3>
                <div className="space-y-3">
                  {item.cookTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-light">Waktu Memasak</span>
                      <span className="text-sm font-medium text-text-main">{item.cookTime}</span>
                    </div>
                  )}
                  {item.servings && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-light">Porsi</span>
                      <span className="text-sm font-medium text-text-main">{item.servings}</span>
                    </div>
                  )}
                  {item.difficulty && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-light">Tingkat Kesulitan</span>
                      <span className="text-sm font-medium text-primary">{item.difficulty}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-light">Kategori</span>
                    <span className="text-sm font-medium text-secondary">
                      {item.category || config.label}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
