import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function CustomCursor() {
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)
  const ringX = useSpring(dotX, { stiffness: 120, damping: 24 })
  const ringY = useSpring(dotY, { stiffness: 120, damping: 24 })
  
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      // Find closest element with interactive tags or custom cursor attribute
      const target = e.target
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.getAttribute('data-cursor') === 'hover' ||
        target.closest('[data-cursor="hover"]')

      if (isInteractive) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [dotX, dotY])

  return (
    <>
      {/* Small Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          width: hovered ? 4 : 8,
          height: hovered ? 4 : 8,
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s'
        }}
      />
      {/* Large Ring */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          width: hovered ? 60 : 36,
          height: hovered ? 60 : 36,
          borderRadius: '50%',
          border: '1.5px solid var(--color-primary)',
          backgroundColor: hovered ? 'rgba(114, 24, 24, 0.1)' : 'transparent',
          zIndex: 9998,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          transition: 'width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.3s'
        }}
      />
    </>
  )
}
