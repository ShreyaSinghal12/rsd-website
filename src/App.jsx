import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import ProjectPage from './pages/ProjectPage';
import CategoryPage from './pages/CategoryPage';

/* Scroll to top on forward navigation only — let the browser's own
   back/forward buttons restore the scroll position they remember,
   instead of always forcing the page back to the top. */
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, navigationType]);
  return null;
}

/* Animated routes wrapper */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services/architecture" element={<ServicePage service="architecture" />} />
          <Route path="/services/interior-design" element={<ServicePage service="interior-design" />} />
          <Route path="/services/turnkey-projects" element={<ServicePage service="turnkey-projects" />} />
          <Route path="/services/pmc" element={<ServicePage service="pmc" />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/projects/residential" element={<CategoryPage category="residential" />} />
          <Route path="/projects/hospitality" element={<CategoryPage category="hospitality" />} />
          <Route path="/projects/builders" element={<CategoryPage category="builders" />} />
          <Route path="/projects/retail" element={<CategoryPage category="retail" />} />
          {/* More routes will be added as pages are built */}
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ScrollToTop />
        <Navbar />
        <main style={{ flexGrow: 1 }}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;