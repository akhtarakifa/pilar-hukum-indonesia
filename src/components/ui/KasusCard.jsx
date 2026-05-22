import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import ImageWithSkeleton from './ImageWithSkeleton'
import Badge from './Badge'

export default function KasusCard({ data, type = 'kpk' }) {
  const cardRef = useRef(null)
  const [showVideo, setShowVideo] = useState(false)
  const [shineStyle, setShineStyle] = useState({ opacity: 0 })

  // 3D Tilt motion values
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  // Spring animations for tilt
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    
    // Relative coordinates between -0.5 and 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Set max 12deg tilt
    rotateX.set(-y * 12)
    rotateY.set(x * 12)

    // Shine effect styling based on mouse coordinates
    const shineX = ((e.clientX - rect.left) / rect.width) * 100
    const shineY = ((e.clientY - rect.top) / rect.height) * 100
    setShineStyle({
      opacity: 0.15,
      background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`
    })
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setShineStyle({ opacity: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 800,
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--border-radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(45,37,36,0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Dynamic Shine Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 3,
          transition: 'opacity 0.2s',
          ...shineStyle
        }}
      />

      {/* Card Header Media */}
      <div style={{ height: '200px', width: '100%', position: 'relative', overflow: 'hidden' }}>
        {showVideo ? (
          <iframe
            src={data.video}
            title={data.judul}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', display: 'block', position: 'relative', zIndex: 4 }}
          />
        ) : (
          <>
            <ImageWithSkeleton src={data.foto} alt={data.judul} />
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                zIndex: 2
              }}
            >
              <Badge variant="accent">
                {type === 'kpk' ? `Tahun ${data.tahun}` : data.nomorPutusan}
              </Badge>
            </div>
            
            {/* Play Button Overlay */}
            {data.video && (
              <button
                onClick={() => setShowVideo(true)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(114, 24, 24, 0.85)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s',
                  zIndex: 2,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(114, 24, 24, 0.85)';
                  e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.0)';
                }}
              >
                ▶
              </button>
            )}
          </>
        )}
      </div>

      {/* Card Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.3rem',
            color: 'var(--color-accent)',
            marginBottom: '10px',
            lineHeight: '1.3'
          }}
        >
          {data.judul}
        </h3>

        {/* Case Metadata */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px', fontSize: '0.85rem' }}>
          {type === 'kpk' ? (
            <>
              <div>
                <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>Tersangka:</span>{' '}
                <strong style={{ color: 'var(--color-accent)' }}>{data.tersangka}</strong>
              </div>
              {data.kerugian && (
                <div>
                  <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>Kerugian Negara:</span>{' '}
                  <strong style={{ color: 'var(--color-primary)' }}>{data.kerugian}</strong>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>Tahun Putusan:</span>{' '}
                <strong style={{ color: 'var(--color-accent)' }}>{data.tahun}</strong>
              </div>
            </>
          )}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--color-text)',
            marginBottom: '20px',
            lineHeight: '1.6',
            flexGrow: 1
          }}
        >
          {type === 'kpk' ? data.deskripsi : data.hasil}
        </p>

        {/* Quotes or Amar Putusan block */}
        {type === 'kpk' && data.kutipanVonis && (
          <blockquote
            style={{
              borderLeft: '3px solid var(--color-primary)',
              paddingLeft: '12px',
              fontStyle: 'italic',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              marginBottom: '20px',
              backgroundColor: 'var(--color-surface-alt)',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0'
            }}
          >
            {data.kutipanVonis}
          </blockquote>
        )}

        {type === 'mk' && data.amarPutusan && (
          <blockquote
            style={{
              borderLeft: '3px solid var(--color-primary)',
              paddingLeft: '12px',
              fontStyle: 'italic',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              marginBottom: '20px',
              backgroundColor: 'var(--color-surface-alt)',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0'
            }}
          >
            {data.amarPutusan}
          </blockquote>
        )}

        {type === 'mk' && data.dampakLangsung && (
          <div
            style={{
              backgroundColor: 'var(--color-surface-alt)',
              padding: '12px',
              borderRadius: 'var(--border-radius-sm)',
              fontSize: '0.85rem',
              marginBottom: '20px',
              border: '1px dashed var(--color-border)'
            }}
          >
            <strong style={{ display: 'block', color: 'var(--color-accent)', marginBottom: '4px' }}>
              ⚡ Dampak Langsung:
            </strong>
            <span style={{ color: 'var(--color-text)' }}>{data.dampakLangsung}</span>
          </div>
        )}

        {/* Footer Link */}
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {showVideo && (
            <button
              onClick={() => setShowVideo(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '600',
                padding: 0
              }}
            >
              ← Kembali ke Foto
            </button>
          )}
          <a
            href={data.sumber}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginLeft: 'auto'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
          >
            Baca Selengkapnya ↗
          </a>
        </div>
      </div>
    </motion.div>
  )
}
