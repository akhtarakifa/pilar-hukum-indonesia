import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { soalKuis } from '../data/kuisData'
import SplitText from './ui/SplitText'
import Badge from './ui/Badge'

export default function KuisSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [shake, setShake] = useState(false)
  const [confetti, setConfetti] = useState([])

  const handleAnswerSelect = (optionIdx) => {
    if (answered) return

    setSelectedAnswer(optionIdx)
    setAnswered(true)

    const isCorrect = optionIdx === soalKuis[currentQuestion].jawaban

    if (isCorrect) {
      setScore(prev => prev + 1)
      triggerConfetti()
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const triggerConfetti = () => {
    const particles = []
    const colors = ['#721818', '#2d2524', '#ffb3b3', '#a23939', '#e1d9ce', '#4caf50']
    
    for (let i = 0; i < 40; i++) {
      particles.push({
        id: i,
        x: Math.random() * 300 - 150, // spread horizontally
        y: Math.random() * -100 - 50,  // shoot upwards
        scale: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotateSpeed: Math.random() * 20 - 10
      })
    }
    setConfetti(particles)
    setTimeout(() => setConfetti([]), 2500)
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setAnswered(false)

    if (currentQuestion < soalKuis.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswered(false)
    setScore(0)
    setShowResult(false)
    setConfetti([])
  }

  const getResultMsg = () => {
    if (score === 5) return 'Luar biasa! Kamu paham betul pilar hukum Indonesia.'
    if (score >= 3) return 'Bagus! Tinggal sedikit lagi pemahamanmu sempurna.'
    return 'Ayo baca lagi materi sejarah KPK & MK agar lebih paham!'
  }

  const q = soalKuis[currentQuestion]
  const progressPercent = ((currentQuestion) / soalKuis.length) * 100

  return (
    <section id="kuis" style={{ backgroundColor: 'var(--color-background)', minHeight: '600px', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ width: '100%' }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Kuis Interaktif
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '8px', fontSize: '2.5rem' }}>
            Uji Pemahamanmu
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
            Asah pengetahuanmu tentang KPK dan Mahkamah Konstitusi
          </p>
        </div>

        {/* CONFETTI LAYER */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 9 }}>
          {confetti.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{ 
                x: p.x, 
                y: p.y + 400, // fall down
                opacity: 0,
                rotate: p.rotation + p.rotateSpeed * 20
              }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: p.scale,
                height: p.scale,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                zIndex: 99
              }}
            />
          ))}
        </div>

        {/* KUIS BOX */}
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: '0 8px 30px rgba(45,37,36,0.04)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Progress Bar */}
          <div style={{ height: '4px', width: '100%', backgroundColor: 'var(--color-surface-alt)' }}>
            <motion.div
              animate={{ width: showResult ? '100%' : `${progressPercent}%` }}
              transition={{ duration: 0.4 }}
              style={{
                height: '100%',
                backgroundColor: showResult && score >= 3 ? '#4caf50' : 'var(--color-primary)'
              }}
            />
          </div>

          <div style={{ padding: '40px' }}>
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {/* Soal Meta */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: '700' }}>
                      SOAL {currentQuestion + 1} DARI {soalKuis.length}
                    </span>
                    <Badge variant="outline">Skor: {score}</Badge>
                  </div>

                  {/* Teks Soal */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.4rem',
                      color: 'var(--color-accent)',
                      marginBottom: '28px',
                      lineHeight: '1.4'
                    }}
                  >
                    {q.soal}
                  </h3>

                  {/* Pilihan Jawaban */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {q.pilihan.map((option, idx) => {
                      const isSelected = selectedAnswer === idx
                      const isCorrectAnswer = q.jawaban === idx
                      
                      let btnBg = 'var(--color-surface-alt)'
                      let btnBorder = 'var(--color-border)'
                      let iconSvg = null
                      
                      if (answered) {
                        if (isCorrectAnswer) {
                          btnBg = '#e8f5e9' // green background
                          btnBorder = '#4caf50'
                          iconSvg = 'check'
                        } else if (isSelected) {
                          btnBg = '#ffebee' // red background
                          btnBorder = '#f44336'
                          iconSvg = 'x'
                        }
                      }

                      return (
                        <motion.button
                          key={idx}
                          onClick={() => handleAnswerSelect(idx)}
                          disabled={answered}
                          animate={answered && isSelected && !isCorrectAnswer && shake ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                          transition={{ duration: 0.4 }}
                          style={{
                            width: '100%',
                            padding: '16px 20px',
                            border: `2px solid ${btnBorder}`,
                            borderRadius: 'var(--border-radius-md)',
                            backgroundColor: btnBg,
                            color: 'var(--color-text)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            textAlign: 'left',
                            cursor: answered ? 'default' : 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s',
                            outline: 'none'
                          }}
                          onMouseEnter={(e) => {
                            if (!answered) {
                              e.currentTarget.style.borderColor = 'var(--color-primary)';
                              e.currentTarget.style.transform = 'scale(1.01)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!answered) {
                              e.currentTarget.style.borderColor = btnBorder;
                              e.currentTarget.style.transform = 'scale(1.0)';
                            }
                          }}
                        >
                          <span>{option}</span>
                          {iconSvg && (
                            iconSvg === 'check' ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f44336" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                              </svg>
                            )
                          )}
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* Penjelasan Singkat */}
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: '24px',
                        padding: '18px',
                        backgroundColor: 'var(--color-background)',
                        borderLeft: '3px solid var(--color-primary)',
                        borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div>
                          <strong style={{ display: 'block', color: 'var(--color-accent)', marginBottom: '4px' }}>
                            Penjelasan:
                          </strong>
                          <span style={{ color: 'var(--color-text-muted)' }}>{q.penjelasan}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tombol Next */}
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <button
                        onClick={handleNext}
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: 'var(--border-radius-sm)',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          fontFamily: 'var(--font-body)',
                          boxShadow: '0 4px 10px rgba(114,24,24,0.2)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                        }}
                      >
                        {currentQuestion === soalKuis.length - 1 ? 'Lihat Hasil' : 'Soal Berikutnya →'}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                /* HASIL AKHIR KUIS */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    {score === 5 ? (
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 15l3 3L22 7"/>
                        <path d="M7 12l3 3 7-7"/>
                      </svg>
                    ) : score >= 3 ? (
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                        <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                      </svg>
                    ) : (
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                        <path d="M6 6h10"/>
                        <path d="M6 10h10"/>
                        <path d="M6 14h10"/>
                      </svg>
                    )}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '8px' }}>
                    Kuis Selesai!
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: 'var(--color-primary)',
                      marginBottom: '16px'
                    }}
                  >
                    Skor: {score} / {soalKuis.length}
                  </div>
                  <p
                    style={{
                      fontSize: '1.1rem',
                      color: 'var(--color-accent)',
                      fontWeight: '600',
                      maxWidth: '440px',
                      margin: '0 auto 32px auto',
                      lineHeight: '1.5'
                    }}
                  >
                    {getResultMsg()}
                  </p>

                  <button
                    onClick={handleRestart}
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: 'var(--border-radius-sm)',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-body)',
                      boxShadow: '0 4px 12px rgba(45,37,36,0.15)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', display: 'inline' }}>
                      <polyline points="23 4 23 10 17 10"/>
                      <polyline points="1 20 1 14 7 14"/>
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36"/>
                    </svg>
                    Ulangi Kuis
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
