import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Detail from './pages/Detail'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-warm flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute><Home /></ProtectedRoute>
              } />
              <Route path="/detail/:type/:id" element={
                <ProtectedRoute><Detail /></ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}
