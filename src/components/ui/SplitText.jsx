import { motion } from 'motion/react'

export default function SplitText({ text, className = '' }) {
  return (
    <span className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.03,
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}
