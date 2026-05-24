import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'motion/react'

// Components
import LoadingScreen from './components/LoadingScreen'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import PengantarSection from './components/PengantarSection'
import KPKSection from './components/KPKSection'
import MKSection from './components/MKSection'
import DampakSection from './components/DampakSection'
import GlosariumSection from './components/GlosariumSection'
import KuisSection from './components/KuisSection'
import TimSection from './components/TimSection'
import ReferensiSection from './components/ReferensiSection'
import FooterSection from './components/FooterSection'
import BackToTop from './components/BackToTop'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()

  // Loading Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500) // 3.5s cinematic intro
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Noise Texture Overlay */}
      <div className="grain-overlay" />

      {/* Loading Screen Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* Main App Layout */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ position: 'relative', width: '100%' }}
        >
          {/* Scroll Progress Indicator Bar at the very top of the page */}
          <motion.div
            style={{
              scaleX: scrollYProgress,
              transformOrigin: 'left',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: 'var(--color-primary)',
              zIndex: 1000
            }}
          />

          {/* Navigation Bar */}
          <NavBar />

          {/* Sections */}
          <HeroSection />
          
          <PengantarSection />
          
          <KPKSection />
          
          <MKSection />
          
          <DampakSection />
          
          <GlosariumSection />
          
          <KuisSection />
          
          <TimSection />
          
          <ReferensiSection />
          
          {/* Footer */}
          <FooterSection />

          {/* Back To Top Button */}
          <BackToTop />
        </motion.div>
      )}
    </>
  )
}
