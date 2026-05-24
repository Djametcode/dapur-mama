import { Link } from 'react-router-dom'
import { ChefHat, Heart, Instagram, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary-dark text-white mt-auto">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-2xl font-bold">
                Dapur <span className="text-primary-light">Mama</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Platform masak untuk para ibu di komunitas RT/RW. 
              Berbagi resep, tutorial, dan tips memasak sehari-hari.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center 
                                   hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center 
                                   hover:bg-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center 
                                   hover:bg-primary transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {['Beranda', 'Resep', 'Tutorial', 'Blog'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-white/70 hover:text-primary text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kategori */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Kategori</h4>
            <ul className="space-y-2">
              {['Masakan Nusantara', 'Kue & Dessert', 'Sayur & Tumis', 'Ikan & Seafood'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/70 hover:text-primary text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row 
                       items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2026 Dapur Mama. Dibuat dengan{' '}
            <Heart className="w-4 h-4 inline text-red-400 fill-red-400" />{' '}
            untuk komunitas.
          </p>
          <p className="text-white/50 text-sm">
            Komunitas RT/RW Masak Bersama
          </p>
        </div>
      </div>
    </footer>
  )
}
