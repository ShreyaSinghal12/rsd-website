import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// import WhatsAppFloat from './components/WhatsAppFloat'
// import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ServicePage from './pages/ServicePage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/residential" element={<CategoryPage category="residential" />} />
          <Route path="/projects/hospitality" element={<CategoryPage category="hospitality" />} />
          <Route path="/projects/builders" element={<CategoryPage category="commercial" />} />
          <Route path="/services/architecture" element={<ServicePage service="architecture" />} />
          <Route path="/services/interior-design" element={<ServicePage service="interior-design" />} />
          <Route path="/services/turnkey-projects" element={<ServicePage service="turnkey-projects" />} />
          <Route path="/services/pmc" element={<ServicePage service="pmc" />} />
        </Routes>
      </main>
      <Footer />
      {/* <WhatsAppFloat />
      <ChatWidget /> */}
    </>
  )
}