import { useState } from 'react'
import { motion } from 'motion/react'

export default function ImageWithSkeleton({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`img-wrapper ${className}`} style={{ position: 'relative', overflow: 'hidden', height: '100%', width: '100%' }}>
      {!loaded && (
        <motion.div
          className="skeleton"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, var(--color-surface-alt) 25%, var(--color-border) 50%, var(--color-surface-alt) 75%)',
            backgroundSize: '200% 100%',
            zIndex: 1
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover'
        }}
      />
    </div>
  )
}
