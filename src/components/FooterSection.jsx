export default function FooterSection() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-background)',
        padding: '50px 24px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        zIndex: 5,
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            fontWeight: '700',
            margin: 0,
            letterSpacing: '0.02em'
          }}
        >
          Pilar Hukum Indonesia
        </p>
        <p
          style={{
            fontSize: '0.9rem',
            margin: 0,
            opacity: 0.8,
            fontFamily: 'var(--font-body)'
          }}
        >
          Tugas Sejarah Indonesia — Landasan Kelembagaan Era Reformasi
        </p>
        <div
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'var(--color-primary)',
            margin: '12px auto'
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            margin: 0,
            opacity: 0.6,
            letterSpacing: '0.05em'
          }}
        >
          KELAS XI SIJA 1 — SMK NEGERI 7 SEMARANG · 2025
        </p>
      </div>
    </footer>
  )
}
