export default function Badge({ children, variant = 'primary', className = '' }) {
  const styles = {
    primary: {
      backgroundColor: 'var(--color-surface-alt)',
      color: 'var(--color-primary)',
      border: '1px solid var(--color-border)',
    },
    accent: {
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-background)',
      border: '1px solid var(--color-accent)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      border: '1px solid var(--color-primary)',
    }
  }

  const selectedStyle = styles[variant] || styles.primary

  return (
    <span
      className={`badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: '600',
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        width: 'max-content',
        ...selectedStyle
      }}
    >
      {children}
    </span>
  )
}
