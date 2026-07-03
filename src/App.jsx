import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/projects/residential" element={<PageTransition><CategoryPage category="residential" /></PageTransition>} />
            <Route path="/projects/hospitality" element={<PageTransition><CategoryPage category="hospitality" /></PageTransition>} />
            <Route path="/projects/builders" element={<PageTransition><CategoryPage category="commercial" /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloat />
      <ChatWidget />
    </>
  )
}