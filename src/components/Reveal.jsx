import { motion } from 'framer-motion'

const OFFSETS = {
  up: { y: 34, x: 0 },
  down: { y: -34, x: 0 },
  left: { y: 0, x: 34 },
  right: { y: 0, x: -34 },
  none: { y: 0, x: 0 },
}

const EASE = [0.22, 1, 0.36, 1]

/**
 * Drop-in replacement for the old scroll-triggered FadeIn.
 * Same props (`children`, `delay` in ms, optional `className`),
 * plus an optional `direction` and `scale` for a bit more life.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  scale = true,
  className = '',
  style = {},
}) {
  const offset = OFFSETS[direction] || OFFSETS.up
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x: offset.x, y: offset.y, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay: delay / 1000, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Wraps a set of children and staggers their entrance. Children should be motion-aware
 * (use RevealItem inside), or plain elements — they'll still fade/slide in together. */
export function RevealGroup({ children, className = '', style = {}, stagger = 0.09 }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, direction = 'up', className = '', style = {} }) {
  const offset = OFFSETS[direction] || OFFSETS.up
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, x: offset.x, y: offset.y, scale: 0.96 },
        show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}
