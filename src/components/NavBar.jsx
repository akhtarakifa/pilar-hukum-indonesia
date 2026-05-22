import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [logoText, setLogoText] = useState('Pilar Hukum')

  const navLinks = [
    { href: '#pengantar', label: 'Pengantar' },
    { href: '#kpk', label: 'KPK' },
    { href: '#mk', label: 'Mahkamah Konstitusi' },
    { href: '#dampak', label: 'Dampak' },
    { href: '#glosarium', label: 'Glosarium' },
    { href: '#kuis', label: 'Kuis' },
    { href: '#tim', label: 'Tim Kami' },
  ]

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Text Scramble Effect for Logo on Hover
  const handleLogoHover = () => {
    const original = 'Pilar Hukum'
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let iterations = 0
    
    const interval = setInterval(() => {
      setLogoText(original.split('').map((char, index) => {
        if (char === ' ') return ' '
        if (index < iterations) return original[index]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))

      iterations += 1/2
      if (iterations >= original.length) {
        clearInterval(interval)
        setLogoText(original)
      }
    }, 30)
  }

  return (
    <>
      <motion.nav
        animate={{
          backgroundColor: scrolled ? 'var(--color-background)' : 'rgba(45,37,36,0.15)',
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.08)' : 'none',
          backdropFilter: scrolled ? 'blur(10px)' : 'none'
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--navbar-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          zIndex: 999,
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{ textDecoration: 'none' }}
          onMouseEnter={handleLogoHover}
        >
          <motion.span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: '700',
              color: scrolled ? 'var(--color-accent)' : '#ffffff',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              display: 'inline-block'
            }}
          >
            {logoText}
          </motion.span>
        </a>

        {/* Desktop Navigation Links */}
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <li key={link.href} style={{ position: 'relative' }}>
              <a
                href={link.href}
                style={{
                  textDecoration: 'none',
                  color: scrolled ? 'var(--color-text)' : '#ffffff',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  transition: 'color 0.3s',
                  padding: '8px 0',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-primary)';
                  const line = e.currentTarget.nextSibling;
                  if (line) line.style.transform = 'scaleX(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled ? 'var(--color-text)' : '#ffffff';
                  const line = e.currentTarget.nextSibling;
                  if (line) line.style.transform = 'scaleX(0)';
                }}
              >
                {link.label}
              </a>
              {/* Animated Underline */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--color-primary)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                }}
              />
            </li>
          ))}
        </ul>

        {/* Hamburger Icon (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            flexDirection: 'column',
            gap: '6px',
            padding: '4px',
            zIndex: 1000
          }}
          className="hamburger-btn"
        >
          <div
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: isOpen || !scrolled ? '#ffffff' : 'var(--color-text)',
              transition: 'transform 0.3s, background-color 0.3s',
              transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'
            }}
          />
          <div
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: isOpen || !scrolled ? '#ffffff' : 'var(--color-text)',
              transition: 'opacity 0.3s, background-color 0.3s',
              opacity: isOpen ? 0 : 1
            }}
          />
          <div
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: isOpen || !scrolled ? '#ffffff' : 'var(--color-text)',
              transition: 'transform 0.3s, background-color 0.3s',
              transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'
            }}
          />
        </button>
      </motion.nav>

      {/* Fullscreen Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 998,
              backgroundColor: 'rgba(45, 37, 36, 0.97)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } }
              }}
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: 'var(--color-background)',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-background)')}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles for displaying Hamburger on mobile */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}
